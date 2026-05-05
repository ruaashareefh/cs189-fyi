export type Category =
  | 'foundations'
  | 'unsupervised'
  | 'regression'
  | 'classification'
  | 'optimization'
  | 'deep'

export interface GraphNode {
  id: string
  label: string
  cat: Category
  lec: string
  desc: string
  x: number
  y: number
}

export interface GraphEdge {
  from: string
  to: string
}

export const CATEGORY_COLORS: Record<Category, string> = {
  foundations: '#5548b0',  // violet — matches site accent
  unsupervised: '#1e8a65', // teal green
  regression:   '#b8661e', // warm amber
  classification:'#2272aa', // steel blue
  optimization:  '#8b38a8', // deep purple
  deep:          '#b03258', // rose
}

export const CATEGORY_LABELS: Record<Category, string> = {
  foundations: 'foundations',
  unsupervised: 'unsupervised',
  regression: 'regression',
  classification: 'classification',
  optimization: 'optimization',
  deep: 'deep learning',
}

export const nodes: GraphNode[] = [
  {
    id: 'prob',
    label: 'Probability\nreview',
    cat: 'foundations',
    lec: 'Lec 4',
    desc: 'Sum/product rules, Bayes theorem, conditional probability, independence',
    x: 0.12,
    y: 0.07,
  },
  {
    id: 'linalg',
    label: 'Linear\nalgebra',
    cat: 'foundations',
    lec: 'prereq',
    desc: 'Vectors, matrices, eigenvalues — required background for the whole course',
    x: 0.38,
    y: 0.07,
  },
  {
    id: 'calc',
    label: 'Multivariate\ncalculus',
    cat: 'foundations',
    lec: 'prereq',
    desc: 'Gradients, chain rule, matrix derivatives (Appendix A.3)',
    x: 0.64,
    y: 0.07,
  },
  {
    id: 'data',
    label: 'Data tools\n& framing',
    cat: 'foundations',
    lec: 'Lec 1-2',
    desc: 'ML problem framing, taxonomy of learning paradigms, data pipelines',
    x: 0.88,
    y: 0.07,
  },
  {
    id: 'gauss',
    label: 'Multivariate\nGaussians',
    cat: 'unsupervised',
    lec: 'Lec 5-6',
    desc: 'Geometry of Gaussians, covariance, MLE for Gaussian parameters',
    x: 0.12,
    y: 0.26,
  },
  {
    id: 'mle',
    label: 'MLE &\nlikelihood',
    cat: 'foundations',
    lec: 'Lec 5',
    desc: 'Maximum likelihood estimation, likelihood functions, log-likelihood',
    x: 0.38,
    y: 0.26,
  },
  {
    id: 'kmeans',
    label: 'K-means\nclustering',
    cat: 'unsupervised',
    lec: 'Lec 4',
    desc: 'Cluster assignments, centroid updates, convergence',
    x: 0.64,
    y: 0.26,
  },
  {
    id: 'terms',
    label: 'ML mechanics\n& terminology',
    cat: 'foundations',
    lec: 'Lec 3',
    desc: 'Train/test split, regularization, model selection, no free lunch theorem',
    x: 0.88,
    y: 0.26,
  },
  {
    id: 'mog',
    label: 'Mixture of\nGaussians',
    cat: 'unsupervised',
    lec: 'Lec 5-7',
    desc: 'Latent variable models, soft assignments, EM algorithm connection',
    x: 0.12,
    y: 0.45,
  },
  {
    id: 'linreg',
    label: 'Linear\nregression',
    cat: 'regression',
    lec: 'Lec 7-10',
    desc: 'OLS, geometry of least squares, basis functions, normal equations',
    x: 0.38,
    y: 0.45,
  },
  {
    id: 'map',
    label: 'MAP &\nBayes',
    cat: 'foundations',
    lec: 'Lec 14',
    desc: 'MAP estimation, prior distributions, connection to regularization',
    x: 0.64,
    y: 0.45,
  },
  {
    id: 'biasvar',
    label: 'Bias–variance\ntradeoff',
    cat: 'regression',
    lec: 'Lec 14',
    desc: 'Underfitting vs overfitting, decomposing generalization error',
    x: 0.88,
    y: 0.45,
  },
  {
    id: 'reg',
    label: 'Regularization\n(L1/L2)',
    cat: 'regression',
    lec: 'Lec 8-10',
    desc: 'Ridge and lasso, weight decay, regularized least squares, model selection',
    x: 0.12,
    y: 0.63,
  },
  {
    id: 'classif',
    label: 'Classification\n& GDA',
    cat: 'classification',
    lec: 'Lec 11',
    desc: 'Discriminant functions, generative classifiers, LDA/QDA',
    x: 0.38,
    y: 0.63,
  },
  {
    id: 'logit',
    label: 'Logistic\nregression',
    cat: 'classification',
    lec: 'Lec 12',
    desc: 'Sigmoid, cross-entropy loss, multi-class softmax, ROC/AUC',
    x: 0.64,
    y: 0.63,
  },
  {
    id: 'entropy',
    label: 'Entropy &\nKL divergence',
    cat: 'optimization',
    lec: 'Lec 16',
    desc: 'Information theory, cross-entropy loss derivation, KL divergence',
    x: 0.88,
    y: 0.63,
  },
  {
    id: 'gd',
    label: 'Gradient\ndescent',
    cat: 'optimization',
    lec: 'Lec 13-15',
    desc: 'Batch/SGD/mini-batch, error surfaces, local quadratic approximation',
    x: 0.20,
    y: 0.79,
  },
  {
    id: 'adam',
    label: 'Momentum\n& Adam',
    cat: 'optimization',
    lec: 'Lec 13',
    desc: 'Momentum, RMSProp, Adam optimizer, learning rate schedules',
    x: 0.50,
    y: 0.79,
  },
  {
    id: 'nn',
    label: 'Neural\nnetworks',
    cat: 'deep',
    lec: 'Lec 17',
    desc: 'Depth, universal approximation theorem, activation functions',
    x: 0.80,
    y: 0.79,
  },
  {
    id: 'backprop',
    label: 'Backprop-\nagation',
    cat: 'deep',
    lec: 'Lec 18-19',
    desc: 'Chain rule over computation graphs, forward/backward passes',
    x: 0.35,
    y: 0.93,
  },
  {
    id: 'cnn',
    label: 'CNNs &\nregularization',
    cat: 'deep',
    lec: 'Lec 19-20',
    desc: 'Convolutions, batch norm, dropout, early stopping, double descent',
    x: 0.65,
    y: 0.93,
  },
]

export const edges: GraphEdge[] = [
  { from: 'prob', to: 'mle' },
  { from: 'prob', to: 'gauss' },
  { from: 'prob', to: 'kmeans' },
  { from: 'prob', to: 'map' },
  { from: 'linalg', to: 'gauss' },
  { from: 'linalg', to: 'linreg' },
  { from: 'linalg', to: 'mle' },
  { from: 'calc', to: 'mle' },
  { from: 'calc', to: 'gd' },
  { from: 'calc', to: 'backprop' },
  { from: 'data', to: 'terms' },
  { from: 'data', to: 'kmeans' },
  { from: 'gauss', to: 'mog' },
  { from: 'gauss', to: 'classif' },
  { from: 'mle', to: 'mog' },
  { from: 'mle', to: 'linreg' },
  { from: 'mle', to: 'classif' },
  { from: 'mle', to: 'logit' },
  { from: 'kmeans', to: 'mog' },
  { from: 'terms', to: 'biasvar' },
  { from: 'terms', to: 'reg' },
  { from: 'mog', to: 'classif' },
  { from: 'linreg', to: 'reg' },
  { from: 'linreg', to: 'classif' },
  { from: 'linreg', to: 'logit' },
  { from: 'map', to: 'reg' },
  { from: 'map', to: 'biasvar' },
  { from: 'map', to: 'mle' },
  { from: 'biasvar', to: 'reg' },
  { from: 'reg', to: 'logit' },
  { from: 'reg', to: 'nn' },
  { from: 'classif', to: 'logit' },
  { from: 'logit', to: 'entropy' },
  { from: 'logit', to: 'gd' },
  { from: 'entropy', to: 'logit' },
  { from: 'gd', to: 'adam' },
  { from: 'gd', to: 'nn' },
  { from: 'gd', to: 'backprop' },
  { from: 'adam', to: 'backprop' },
  { from: 'adam', to: 'nn' },
  { from: 'nn', to: 'backprop' },
  { from: 'nn', to: 'cnn' },
  { from: 'backprop', to: 'cnn' },
]
