export type Status = 'published' | 'draft' | 'coming-soon'

export type TopicTag = {
  label: string
  type: 'math' | 'concept' | 'code' | 'proof'
}

export interface LectureMeta {
  slug: string
  lecture: number
  title: string
  description: string
  tags: TopicTag[]
  readTime: number
  status: Status
  date?: string
  prereqs?: string[]
}

// Topic chip colors by type
export const TAG_COLORS: Record<TopicTag['type'], { bg: string; text: string; border: string }> = {
  math:    { bg: 'rgba(200, 191, 255, 0.08)', text: '#c8bfff', border: 'rgba(200, 191, 255, 0.2)' },
  concept: { bg: 'rgba(137, 196, 225, 0.08)', text: '#89c4e1', border: 'rgba(137, 196, 225, 0.2)' },
  code:    { bg: 'rgba(125, 211, 168, 0.08)', text: '#7dd3a8', border: 'rgba(125, 211, 168, 0.2)' },
  proof:   { bg: 'rgba(245, 200, 66, 0.08)',  text: '#f5c842', border: 'rgba(245, 200, 66, 0.2)' },
}

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  published:    { label: 'Published',    color: '#7dd3a8' },
  draft:        { label: 'In progress',  color: '#f5c842' },
  'coming-soon':{ label: 'Coming soon',  color: '#4a4a5e' },
}

// All lectures — populated from MDX frontmatter at runtime,
// but also defined here as a static list for the index page ordering.
export const LECTURE_LIST: LectureMeta[] = [
  {
    slug: '01-intro',
    lecture: 1,
    title: 'Introduction & Linear Algebra Review',
    description: 'What is ML? Vectors, matrices, eigendecomposition, the SVD. Everything you need to hold up the rest of the course.',
    tags: [{ label: 'Linear Algebra', type: 'math' }, { label: 'SVD', type: 'math' }],
    readTime: 20,
    status: 'coming-soon',
  },
  {
    slug: '02-probability',
    lecture: 2,
    title: 'Probability & Statistics Review',
    description: 'Random variables, Gaussians, MLE, MAP. The probabilistic lens through which the whole course is viewed.',
    tags: [{ label: 'Probability', type: 'math' }, { label: 'MLE', type: 'concept' }, { label: 'Bayes', type: 'concept' }],
    readTime: 22,
    status: 'coming-soon',
  },
  {
    slug: '03-linear-regression',
    lecture: 3,
    title: 'Linear Regression',
    description: 'The normal equation. Least squares as projection. Geometric intuition that carries through the whole course.',
    tags: [{ label: 'Regression', type: 'concept' }, { label: 'Normal Equation', type: 'math' }, { label: 'Geometry', type: 'concept' }],
    readTime: 25,
    status: 'coming-soon',
  },
  {
    slug: '04-gda',
    lecture: 4,
    title: 'Gaussian Discriminant Analysis',
    description: 'Model each class as a Gaussian. Derive the decision boundary. Understand when GDA beats logistic regression — and when it doesn\'t.',
    tags: [{ label: 'Generative', type: 'concept' }, { label: 'Gaussians', type: 'math' }, { label: 'MLE', type: 'proof' }, { label: 'Classification', type: 'concept' }],
    readTime: 28,
    status: 'published',
    date: '2025-02-03',
    prereqs: ['02-probability'],
  },
  {
    slug: '05-logistic-regression',
    lecture: 5,
    title: 'Logistic Regression',
    description: 'The discriminative answer to GDA. Sigmoid, cross-entropy loss, gradient descent. Why MLE doesn\'t have a closed form here.',
    tags: [{ label: 'Discriminative', type: 'concept' }, { label: 'Cross-Entropy', type: 'math' }, { label: 'Optimization', type: 'concept' }],
    readTime: 24,
    status: 'coming-soon',
  },
  {
    slug: '06-gradient-descent',
    lecture: 6,
    title: 'Gradient Descent & Optimization',
    description: 'Batch vs stochastic vs mini-batch. Learning rate schedules. Momentum. Why local minima aren\'t the real enemy.',
    tags: [{ label: 'Optimization', type: 'math' }, { label: 'SGD', type: 'code' }],
    readTime: 20,
    status: 'coming-soon',
  },
  {
    slug: '07-ridge-lasso',
    lecture: 7,
    title: 'Ridge & Lasso Regression',
    description: 'L2 and L1 regularization. The Bayesian interpretation. Why Lasso induces sparsity and Ridge doesn\'t.',
    tags: [{ label: 'Regularization', type: 'concept' }, { label: 'Sparsity', type: 'concept' }, { label: 'MAP', type: 'proof' }],
    readTime: 22,
    status: 'coming-soon',
  },
  {
    slug: '08-bias-variance',
    lecture: 8,
    title: 'Bias-Variance Tradeoff',
    description: 'The fundamental tension in ML. Decomposing test error. Cross-validation. Why simple models generalize.',
    tags: [{ label: 'Generalization', type: 'concept' }, { label: 'Bias-Variance', type: 'math' }, { label: 'Cross-Validation', type: 'code' }],
    readTime: 20,
    status: 'coming-soon',
  },
  {
    slug: '09-pca',
    lecture: 9,
    title: 'PCA & Dimensionality Reduction',
    description: 'Principal components as directions of maximum variance. Connection to SVD. When and why to reduce dimensions.',
    tags: [{ label: 'PCA', type: 'concept' }, { label: 'SVD', type: 'math' }, { label: 'Unsupervised', type: 'concept' }],
    readTime: 26,
    status: 'coming-soon',
  },
  {
    slug: '10-decision-trees',
    lecture: 10,
    title: 'Decision Trees',
    description: 'Information gain, Gini impurity, CART. Why trees overfit and how pruning fixes it.',
    tags: [{ label: 'Trees', type: 'concept' }, { label: 'Information Theory', type: 'math' }],
    readTime: 22,
    status: 'coming-soon',
  },
  {
    slug: '11-ensembles',
    lecture: 11,
    title: 'Ensembles & Random Forests',
    description: 'Bagging, boosting, and why averaging works. Random forests as variance reduction machines.',
    tags: [{ label: 'Ensembles', type: 'concept' }, { label: 'Variance Reduction', type: 'math' }],
    readTime: 22,
    status: 'coming-soon',
  },
  {
    slug: '12-svm-hard',
    lecture: 12,
    title: 'SVMs I — Hard Margin',
    description: 'Maximum margin classifiers. The primal QP. Why the solution depends only on a few points.',
    tags: [{ label: 'SVMs', type: 'concept' }, { label: 'Optimization', type: 'math' }, { label: 'Geometry', type: 'concept' }],
    readTime: 28,
    status: 'coming-soon',
  },
  {
    slug: '13-sgd',
    lecture: 13,
    title: 'Stochastic Gradient Descent',
    description: 'From batch GD to SGD. Taylor derivation of the update rule, convergence analysis, momentum, Adam, and why mini-batches are all anyone uses.',
    tags: [{ label: 'Optimization', type: 'math' }, { label: 'SGD', type: 'concept' }, { label: 'Adam', type: 'concept' }, { label: 'Convergence', type: 'proof' }],
    readTime: 35,
    status: 'published',
    date: '2025-02-10',
    prereqs: ['03-linear-regression'],
  },
  {
    slug: '14-mle-map',
    lecture: 14,
    title: 'MLE, MAP, and Bias-Variance Tradeoff',
    description: 'From coins to regression weights. Derive ridge regression from MAP with a Gaussian prior. Then decompose test error into noise, bias, and variance — and understand exactly what each term means.',
    tags: [
      { label: 'MLE/MAP', type: 'proof' },
      { label: 'Regularization', type: 'concept' },
      { label: 'Bias-Variance', type: 'math' },
      { label: 'Bayes', type: 'concept' },
    ],
    readTime: 45,
    status: 'published',
    date: '2025-02-17',
    prereqs: ['13-sgd'],
  },
  {
    slug: '15-gradient-descent',
    lecture: 15,
    title: 'Learning with Gradient Descent',
    description: 'From writing down the loss to taking a step to proving convergence. Derive the quadratic approximation, read the Hessian\'s eigenvalues to classify critical points, bound the learning rate by λ_max, and see how momentum, SGD, and Adam fix the failure modes of plain GD.',
    tags: [
      { label: 'Gradient Descent', type: 'concept' },
      { label: 'Hessian', type: 'math' },
      { label: 'Convergence', type: 'proof' },
      { label: 'SGD/Adam', type: 'concept' },
    ],
    readTime: 50,
    status: 'published',
    date: '2025-02-23',
    prereqs: ['13-sgd', '14-mle-map'],
  },
  {
    slug: '16-entropy-logreg',
    lecture: 16,
    title: 'Entropy, Information & Logistic Regression',
    description: 'Entropy and information theory from first principles. KL divergence, cross entropy, and the central result: MLE for logistic regression is exactly minimizing cross entropy loss.',
    tags: [
      { label: 'Information Theory', type: 'math' },
      { label: 'Cross Entropy', type: 'proof' },
      { label: 'Logistic Regression', type: 'concept' },
      { label: 'Softmax', type: 'concept' },
    ],
    readTime: 50,
    status: 'published',
    date: '2025-03-03',
    prereqs: ['04-gda', '13-sgd'],
  },
  {
    slug: '17-neural-networks',
    lecture: 17,
    title: 'Neural Networks: XOR, Nonlinearity, and Why Depth Matters',
    description: 'Why linear models fail XOR. Deep linear is still linear. ReLU breaks the stalemate. Feed-forward network notation, universal approximation, and the activation function zoo.',
    tags: [
      { label: 'Neural Networks', type: 'concept' },
      { label: 'Nonlinearity', type: 'math' },
      { label: 'ReLU', type: 'concept' },
      { label: 'PyTorch', type: 'code' },
    ],
    readTime: 55,
    status: 'published',
    date: '2025-03-10',
    prereqs: ['15-gradient-descent', '16-entropy-logreg'],
  },
  {
    slug: '18-backprop',
    lecture: 18,
    title: 'Backpropagation: Computing Gradients Efficiently in Neural Networks',
    description: 'Backprop is just gradient computation via dynamic programming on a computation graph. Bar notation, single- and multi-child rules, MLP worked example, and why finite differences fail.',
    tags: [
      { label: 'Backpropagation', type: 'proof' },
      { label: 'Computation Graphs', type: 'concept' },
      { label: 'Chain Rule', type: 'math' },
      { label: 'Autodiff', type: 'code' },
    ],
    readTime: 60,
    status: 'published',
    date: '2025-03-17',
    prereqs: ['17-neural-networks'],
  },
]

export function getLectureBySlug(slug: string): LectureMeta | undefined {
  return LECTURE_LIST.find((l) => l.slug === slug)
}
