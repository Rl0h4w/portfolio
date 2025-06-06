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
    title: 'Fraud Detection for Vehicle Images',
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
    links: {}
  },
  {
    id: 3,
    title: 'Real-time Heart Rate Estimation',
    shortDesc: 'Deep learning model for contactless pulse detection from facial video',
    fullDesc: 
      'Developed a 3D CNN-LSTM architecture for real-time heart rate estimation from facial video streams. The solution combines YOLO-based face detection with a custom deep learning pipeline for temporal feature extraction.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'YOLO', 'Deep Learning'],
    featured: true,
    achievements: [
      'Implemented a hybrid 3D CNN-LSTM architecture for temporal feature extraction',
      'Integrated YOLOv8 face detection for robust face tracking and ROI extraction',
      'Achieved real-time performance through efficient batch processing and data pipeline optimization',
      'Built with TensorFlow distributed strategy for multi-GPU training support',
      'MAE 0.82, RMSE: 1.001'
    ],
    links: {
      github: 'https://github.com/Rl0h4w/BestHack'
  },
}

];
