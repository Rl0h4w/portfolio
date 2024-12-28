// src/data/projectsData.js

export const projects = [
  {
    id: 1,
    title: 'Image Denoising and Enhancement',
    shortDesc: 'Efficient image processing with constrained resources',
    fullDesc:
        'Developed models for image denoising, color correction, and super-resolution using deep learning techniques. Optimized hyperparameters with Optuna for enhanced performance under resource constraints.',
    techStack: ['Python', 'TensorFlow', 'Optuna'],
    featured: true,
    links: {github: 'https://github.com/rlohaw/project1'},
    achievements: [
      'Implemented noise removal and color correction models with minimal latency',
      'Integrated Residual Channel Attention Network (RCAN) for super-resolution tasks',
      'Optimized models to run efficiently on limited computational resources'
    ]
  },
  {
    id: 2,
    title: 'Fraud Detection for Vehicle Images (NDA)',
    shortDesc: 'Advanced fraud detection with 2.5D car imagery',
    fullDesc:
        'Developed a model to detect fraud from 2.5D vehicle imagery (photos from four sides of a car). The solution was optimized to run inference on a single-core CPU with 3GB of RAM, meeting stringent resource constraints.',
    techStack: ['Python', 'PyTorch', 'EfficientFormer'],
    featured: true,
    achievements: [
      'Implemented a unified backbone (EfficientFormer_l1) with separate heads for damage, fraud, and side classification',
      'Introduced a combined binary target for an ALL_GOOD class for better generalization',
      'Applied advanced, class-specific augmentations using imgaug to handle noisy and inconsistent annotations',
      'Optimized for inference on resource-constrained hardware with CosineAnnealingWarmRestarts scheduler and AdamW optimizer'
    ],
    links: {
      github: 'https://github.com/rlohaw/project2',
      live: 'https://fraud-detection.example.com'  // Assuming you have a live
                                                   // demo
    }
  }  // You can add more project objects here following the same structure
];
