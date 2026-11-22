import AppKit
import CoreText

struct Resume: Decodable {
    struct Link: Decodable { let text: String; let url: URL }
    struct Section: Decodable {
        struct Entry: Decodable {
            let title: String?
            let date: String?
            let bullets: [String]?
            let lines: [String]?
        }
        let heading: String
        let entries: [Entry]
    }
    let name: String
    let role: String
    let description: String
    let links: [Link]
    let sections: [Section]
}

let resume = try JSONDecoder().decode(Resume.self, from: FileHandle.standardInput.readDataToEndOfFile())
let output = URL(fileURLWithPath: CommandLine.arguments[1]) as CFURL
var page = CGRect(x: 0, y: 0, width: 595, height: 842)
let metadata = [kCGPDFContextTitle: "\(resume.name) – \(resume.role)", kCGPDFContextAuthor: resume.name]
guard let pdf = CGContext(output, mediaBox: &page, metadata as CFDictionary) else {
    fatalError("Could not open PDF")
}

let ink = NSColor(srgbRed: 0.13, green: 0.12, blue: 0.16, alpha: 1)
let muted = NSColor(srgbRed: 0.30, green: 0.29, blue: 0.36, alpha: 1)
let accent = NSColor(srgbRed: 0.28, green: 0.20, blue: 0.74, alpha: 1)
let line = NSColor(srgbRed: 0.85, green: 0.83, blue: 0.89, alpha: 1)
let left: CGFloat = 46
let right = page.width - left
let width = right - left
var cursor = page.height - 38

func attributed(_ text: String, size: CGFloat, weight: NSFont.Weight, color: NSColor) -> NSAttributedString {
    NSAttributedString(string: text, attributes: [
        .font: NSFont.systemFont(ofSize: size, weight: weight),
        .foregroundColor: color,
    ])
}

func measure(_ text: NSAttributedString) -> CGFloat {
    CGFloat(CTLineGetTypographicBounds(CTLineCreateWithAttributedString(text), nil, nil, nil))
}

@discardableResult
func paragraph(
    _ text: NSAttributedString,
    x: CGFloat = left,
    w: CGFloat = width,
    spacing: CGFloat = 0
) -> CGFloat {
    let framesetter = CTFramesetterCreateWithAttributedString(text)
    let size = CTFramesetterSuggestFrameSizeWithConstraints(
        framesetter, CFRange(), nil, CGSize(width: w, height: .greatestFiniteMagnitude), nil
    )
    let height = ceil(size.height) + 1
    let rect = CGRect(x: x, y: cursor - height, width: w, height: height)
    let frame = CTFramesetterCreateFrame(framesetter, CFRange(), CGPath(rect: rect, transform: nil), nil)
    CTFrameDraw(frame, pdf)
    cursor = rect.minY - spacing
    return height
}

pdf.beginPDFPage(nil)
paragraph(attributed(resume.name, size: 32, weight: .bold, color: ink), spacing: 4)
paragraph(attributed(resume.role, size: 15, weight: .semibold, color: accent), spacing: 7)
paragraph(attributed(resume.description, size: 11, weight: .regular, color: muted), spacing: 8)

var linkX = left
let linkTop = cursor
for link in resume.links {
    let label = attributed(link.text, size: 10.5, weight: .semibold, color: accent)
    let linkWidth = ceil(measure(label)) + 2
    cursor = linkTop
    let height = paragraph(label, x: linkX, w: linkWidth + 2)
    pdf.setURL(link.url as CFURL, for: CGRect(x: linkX, y: cursor, width: linkWidth, height: height))
    linkX += linkWidth + 17
}
cursor -= 14

for section in resume.sections {
    pdf.setStrokeColor(line.cgColor)
    pdf.setLineWidth(0.7)
    pdf.move(to: CGPoint(x: left, y: cursor))
    pdf.addLine(to: CGPoint(x: right, y: cursor))
    pdf.strokePath()
    cursor -= 6
    paragraph(attributed(section.heading, size: 14, weight: .bold, color: accent), spacing: 5)

    for entry in section.entries {
        if let title = entry.title {
            let heading = attributed(title, size: 11, weight: .semibold, color: ink)
            if let date = entry.date {
                let dateLabel = attributed(date, size: 9.5, weight: .regular, color: muted)
                let dateWidth = ceil(measure(dateLabel)) + 4
                let top = cursor
                paragraph(heading, w: width - dateWidth - 9, spacing: 2)
                let afterHeading = cursor
                cursor = top
                paragraph(dateLabel, x: right - dateWidth, w: dateWidth, spacing: 2)
                cursor = min(cursor, afterHeading)
            } else {
                paragraph(heading, spacing: 2)
            }
        }
        for bullet in entry.bullets ?? [] {
            let top = cursor
            paragraph(attributed("•", size: 10.5, weight: .regular, color: accent), w: 10)
            cursor = top
            paragraph(attributed(bullet, size: 10.5, weight: .regular, color: ink), x: left + 13, w: width - 13, spacing: 1)
        }
        for line in entry.lines ?? [] {
            paragraph(attributed(line, size: 10.5, weight: .regular, color: ink), spacing: 1)
        }
        cursor -= 4
    }
    cursor -= 4
}

guard cursor > 32 else { fatalError("Résumé overflows the page") }
pdf.endPDFPage()
pdf.closePDF()
