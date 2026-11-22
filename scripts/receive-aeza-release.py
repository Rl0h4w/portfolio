#!/usr/bin/python3
"""Publish a static build streamed on stdin by the restricted CI SSH key."""

import fcntl
import os
from pathlib import Path, PurePosixPath
import shutil
import sys
import tarfile
import tempfile

ROOT = Path("/srv/www/rlohaw.ru")
MAX_BYTES = 16 * 1024 * 1024
MAX_ENTRIES = 200
REQUIRED = ("index.html", "ru/index.html", "cv.pdf", "cv-en.pdf")


def unpack(destination):
    size = 0
    seen = set()
    with tarfile.open(fileobj=sys.stdin.buffer, mode="r|gz") as archive:
        for member in archive:
            name = PurePosixPath(member.name)
            if name == PurePosixPath(".") and member.isdir():
                continue
            if not name.parts or name.is_absolute() or ".." in name.parts or name in seen:
                raise ValueError(f"Invalid archive path: {member.name!r}")
            seen.add(name)
            size += member.size
            if len(seen) > MAX_ENTRIES or size > MAX_BYTES:
                raise ValueError("Static build exceeds the configured upload limit")
            target = destination.joinpath(*name.parts)
            if member.isdir():
                target.mkdir(parents=True, exist_ok=True)
            elif member.isfile():
                target.parent.mkdir(parents=True, exist_ok=True)
                with archive.extractfile(member) as source, target.open("xb") as output:
                    shutil.copyfileobj(source, output)
            else:
                raise ValueError("Only regular files and directories are accepted")

    if not all((destination / name).is_file() for name in REQUIRED):
        raise ValueError("The build is missing a required page or résumé")
    if not any((destination / "assets").glob("*.js")):
        raise ValueError("The build is missing its browser JavaScript")


def publish():
    os.umask(0o022)
    with (ROOT / ".deploy.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        release = Path(tempfile.mkdtemp(prefix="ci.", dir=ROOT / "releases"))
        pending = ROOT / f".current-{release.name}"
        try:
            unpack(release)
            release.chmod(0o755)
            pending.symlink_to(release.relative_to(ROOT))
            pending.replace(ROOT / "current")
        except (OSError, ValueError, tarfile.TarError):
            pending.unlink(missing_ok=True)
            shutil.rmtree(release)
            raise
    print(f"Published {release.name}")


if __name__ == "__main__":
    publish()
