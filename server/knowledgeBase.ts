/**
 * Machine Learning Structured Knowledge Base (21 Categories)
 */

export interface KnowledgeTopic {
  id: string;
  number: number;
  title: string;
  category: string;
  summary: string;
  keyConcepts: string[];
  formula?: string;
  example: string;
  pythonSnippet?: string;
}

export interface AlgorithmDetail {
  id: string;
  name: string;
  category: 'Supervised - Regression' | 'Supervised - Classification' | 'Supervised - Both' | 'Unsupervised - Clustering' | 'Unsupervised - Dimensionality Reduction' | 'Ensemble Methods';
  description: string;
  mathFoundation: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  codeSample: string;
  hyperparameters: string[];
}

export interface GlossaryItem {
  term: string;
  category: string;
  definition: string;
  formulaOrIntuition?: string;
  example: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  tools: string[];
  projectIdea: string;
}

export const ML_KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'fundamentals',
    number: 1,
    title: 'ML Fundamentals',
    category: 'Foundations',
    summary: 'Machine Learning enables computers to learn patterns directly from empirical data without being explicitly programmed with deterministic rules.',
    keyConcepts: ['Data-driven learning', 'Inductive bias', 'Generalization', 'Experience (E), Task (T), Performance (P)'],
    formula: 'P(T) improves with Experience E',
    example: 'Spam filters analyzing millions of labeled emails to distinguish legitimate messages from spam.',
    pythonSnippet: '# Basic representation: y = f(X)\nimport numpy as np\nX = np.array([[1, 2], [2, 3], [3, 4]])\ny = np.array([3, 5, 7])'
  },
  {
    id: 'types-of-ml',
    number: 2,
    title: 'Types of Machine Learning',
    category: 'Foundations',
    summary: 'The three primary paradigms of Machine Learning are Supervised Learning, Unsupervised Learning, and Reinforcement Learning.',
    keyConcepts: ['Supervised (labeled data)', 'Unsupervised (unlabeled patterns)', 'Reinforcement (agent, environment, reward)', 'Semi-supervised & Self-supervised'],
    example: 'Supervised: House price prediction. Unsupervised: Customer market segmentation. Reinforcement: Autonomous vehicle steering.',
  },
  {
    id: 'supervised-learning',
    number: 3,
    title: 'Supervised Learning',
    category: 'Paradigms',
    summary: 'Learning a mapping function f: X -> y from paired input-output examples so that the model can accurately predict target values for unseen test inputs.',
    keyConcepts: ['Ground truth labels', 'Loss minimization', 'Continuous targets (Regression)', 'Discrete targets (Classification)'],
    formula: 'min_w \\sum_{i=1}^n L(f(x_i; w), y_i)',
    example: 'Predicting patient readmission risk within 30 days given clinical history features.',
    pythonSnippet: 'from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)'
  },
  {
    id: 'unsupervised-learning',
    number: 4,
    title: 'Unsupervised Learning',
    category: 'Paradigms',
    summary: 'Discovering hidden structures, groupings, clusters, or lower-dimensional representations in unlabeled feature spaces without human-annotated targets.',
    keyConcepts: ['Density estimation', 'Cluster analysis', 'Manifold learning', 'Association rule mining'],
    example: 'E-commerce basket analysis discovering items frequently purchased together.',
  },
  {
    id: 'reinforcement-learning',
    number: 5,
    title: 'Reinforcement Learning',
    category: 'Paradigms',
    summary: 'An autonomous agent learns an optimal policy by executing actions in an environment to maximize cumulative scalar reward signals over time.',
    keyConcepts: ['Markov Decision Process (MDP)', 'Policy \\pi(a|s)', 'Value function V(s)', 'Exploration vs Exploitation'],
    formula: 'Q(s, a) = R(s, a) + \\gamma \\max_{a\'} Q(s\', a\')  [Bellman Equation]',
    example: 'AlphaGo learning to master Go by playing millions of games against itself with win/loss rewards.',
  },
  {
    id: 'regression',
    number: 6,
    title: 'Regression Analysis',
    category: 'Supervised Learning',
    summary: 'Modeling and predicting continuous quantitative numerical outputs given a vector of explanatory predictor features.',
    keyConcepts: ['Ordinary Least Squares (OLS)', 'Residual sum of squares', 'Homoscedasticity', 'Multicollinearity'],
    formula: 'y = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_p x_p + \\epsilon',
    example: 'Predicting car fuel efficiency (MPG) based on engine displacement, horsepower, and weight.',
    pythonSnippet: 'from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)'
  },
  {
    id: 'classification',
    number: 7,
    title: 'Classification Analysis',
    category: 'Supervised Learning',
    summary: 'Predicting qualitative categorical class memberships (binary, multi-class, or multi-label) for given input observations.',
    keyConcepts: ['Decision boundaries', 'Posterior probability P(Y=k|X)', 'Sigmoid & Softmax functions', 'Threshold calibration'],
    formula: '\\sigma(z) = \\frac{1}{1 + e^{-z}}',
    example: 'Medical diagnostic screening: classifying breast tissue biopsies as benign or malignant.',
    pythonSnippet: 'from sklearn.linear_model import LogisticRegression\nclf = LogisticRegression()\nclf.fit(X_train, y_train)'
  },
  {
    id: 'clustering',
    number: 8,
    title: 'Clustering',
    category: 'Unsupervised Learning',
    summary: 'Partitioning unlabelled observation vectors into cohesive subgroups such that intra-cluster distance is minimized and inter-cluster distance is maximized.',
    keyConcepts: ['Centroid-based (K-Means)', 'Density-based (DBSCAN)', 'Hierarchical (Agglomerative)', 'Elbow Method & Silhouette Score'],
    formula: 'WCSS = \\sum_{k=1}^K \\sum_{x \\in C_k} ||x - \\mu_k||^2',
    example: 'Customer segmentation into behavioral personas for personalized recommendation campaigns.',
  },
  {
    id: 'dimensionality-reduction',
    number: 9,
    title: 'Dimensionality Reduction',
    category: 'Unsupervised Learning',
    summary: 'Transforming high-dimensional feature spaces into lower-dimensional manifolds while preserving maximal statistical variance or topological distances.',
    keyConcepts: ['Curse of dimensionality', 'Eigenvalue decomposition', 'Singular Value Decomposition (SVD)', 't-SNE & UMAP'],
    formula: 'X = U \\Sigma V^T',
    example: 'Compressing 10,000 gene expression attributes into 50 principal components to avoid overfitting.',
  },
  {
    id: 'ml-algorithms',
    number: 10,
    title: 'ML Algorithms Overview',
    category: 'Algorithms',
    summary: 'A mathematical spectrum of parametric vs non-parametric estimators including Trees, Ensembles, Support Vector Machines, and Bayes Classifiers.',
    keyConcepts: ['Parametric vs Non-parametric', 'Linear vs Non-linear boundaries', 'Ensemble stacking', 'Kernel trick'],
    example: 'Choosing Random Forest over Linear Regression when relationship contains high-order non-linear feature interactions.',
  },
  {
    id: 'data-preprocessing',
    number: 11,
    title: 'Data Preprocessing',
    category: 'Data Pipeline',
    summary: 'Cleaning, normalizing, and structuring messy real-world raw datasets into numerical tensors suitable for mathematical estimators.',
    keyConcepts: ['Missing value imputation', 'Standardization (Z-score)', 'Min-Max scaling', 'Outlier removal', 'Handling duplicates'],
    formula: 'z = \\frac{x - \\mu}{\\sigma}, \\quad x_{scaled} = \\frac{x - x_{min}}{x_{max} - x_{min}}',
    example: 'Replacing missing age values with median imputation and scaling salary between 0 and 1.',
  },
  {
    id: 'feature-engineering',
    number: 12,
    title: 'Feature Engineering',
    category: 'Data Pipeline',
    summary: 'Crafting domain-specific representations, polynomial expansions, interaction terms, and encodings to maximize model predictive power.',
    keyConcepts: ['One-Hot Encoding', 'Target Encoding', 'Interaction terms', 'Feature Selection (Lasso, RF Importance, Mutual Info)'],
    example: 'Extracting day-of-week, hour-of-day, and holiday flags from a raw timestamp string.',
  },
  {
    id: 'model-training',
    number: 13,
    title: 'Model Training & Optimization',
    category: 'Optimization',
    summary: 'Iteratively adjusting model parameters using numerical optimization algorithms (like Gradient Descent) to minimize empirical loss.',
    keyConcepts: ['Loss surfaces', 'Stochastic Gradient Descent (SGD)', 'Adam optimizer', 'Batch size & Epochs', 'Early stopping'],
    formula: 'w_{t+1} = w_t - \\eta \\nabla_w L(w_t)',
    example: 'Training a neural network with 100 epochs, early stopping patience of 5, and Adam optimizer.',
  },
  {
    id: 'model-evaluation',
    number: 14,
    title: 'Model Evaluation Metrics',
    category: 'Evaluation',
    summary: 'Rigorously validating how well trained models generalize to unseen test distributions across diverse performance metrics.',
    keyConcepts: ['Confusion Matrix', 'Accuracy vs Precision vs Recall', 'F1-Score', 'ROC curve & AUC', 'MSE, RMSE, MAE, R²'],
    formula: 'F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
    example: 'Evaluating a cancer detection model prioritizing high Recall (minimizing False Negatives).',
  },
  {
    id: 'hyperparameter-tuning',
    number: 15,
    title: 'Hyperparameter Tuning',
    category: 'Optimization',
    summary: 'Systematically searching the configuration space of structural parameters that govern the learning process prior to training.',
    keyConcepts: ['Grid Search', 'Random Search', 'Bayesian Optimization (Optuna/Hyperopt)', 'Nested Cross-Validation'],
    example: 'Tuning Random Forest `n_estimators`, `max_depth`, and `min_samples_split` using 5-fold cross-validation.',
  },
  {
    id: 'overfitting-underfitting',
    number: 16,
    title: 'Overfitting & Underfitting',
    category: 'Model Diagnostics',
    summary: 'Diagnosing model capacity issues where a model either memorizes training noise or fails to capture underlying data relationships.',
    keyConcepts: ['Generalization gap', 'Regularization (L1 Lasso, L2 Ridge)', 'Dropout', 'Data augmentation', 'Cross-validation checks'],
    example: 'High training accuracy (99%) but poor validation accuracy (64%) signals severe overfitting.',
  },
  {
    id: 'bias-variance',
    number: 17,
    title: 'Bias and Variance Tradeoff',
    category: 'Theory',
    summary: 'Decomposing generalization error into bias (erroneous assumptions) and variance (sensitivity to small fluctuations in training set).',
    keyConcepts: ['Total Error = Bias² + Variance + Irreducible Error', 'Model complexity curve', 'Ensemble variance reduction'],
    formula: 'E[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2',
    example: 'High bias: Linear model on circular data. High variance: 20-depth Decision tree with single sample leaves.',
  },
  {
    id: 'neural-networks',
    number: 18,
    title: 'Neural Networks & Perceptrons',
    category: 'Deep Learning',
    summary: 'Layered computational graphs of interconnected nodes applying non-linear activation functions to compute complex mathematical representations.',
    keyConcepts: ['Artificial Neuron / Perceptron', 'Forward propagation', 'Backpropagation algorithm', 'Chain rule of calculus'],
    formula: 'a = \\phi(W^T x + b)',
    example: 'Multi-layer perceptron (MLP) learning non-linear XOR decision boundary using hidden layer with ReLU.',
  },
  {
    id: 'deep-learning',
    number: 19,
    title: 'Deep Learning Architectures',
    category: 'Deep Learning',
    summary: 'Deep neural networks with specialized architectural inductive biases for computer vision (CNN), sequences (RNN/LSTM), and language (Transformers).',
    keyConcepts: ['Convolutional layers', 'Recurrent units & gates', 'Self-Attention: Softmax(QK^T / \\sqrt{d_k})V', 'Transfer learning'],
    example: 'ResNet-50 classifying images with residual skip connections preventing vanishing gradients.',
  },
  {
    id: 'ml-applications',
    number: 20,
    title: 'Real-World ML Applications',
    category: 'Applications',
    summary: 'Industrial deployments of ML spanning automated healthcare diagnostics, algorithmic trading, recommendation engines, and autonomous driving.',
    keyConcepts: ['Churn prediction', 'Fraud detection', 'Collaborative filtering', 'Autonomous perception', 'NLP chatbots'],
    example: 'Netflix movie recommendation engine combining matrix factorization and deep neural networks.',
  },
  {
    id: 'ml-deployment',
    number: 21,
    title: 'ML Deployment & MLOps',
    category: 'MLOps',
    summary: 'Bridging model development into live production serving pipelines, telemetry monitoring, drift detection, and automated retraining.',
    keyConcepts: ['Model serialization (ONNX/Pickle)', 'REST APIs (FastAPI/Express)', 'Data drift vs Concept drift', 'CI/CD for ML'],
    example: 'Exporting trained scikit-learn model to ONNX runtime inside containerized Docker service behind API gateway.',
  }
];

export const ML_ALGORITHMS: AlgorithmDetail[] = [
  {
    id: 'linear-regression',
    name: 'Linear Regression',
    category: 'Supervised - Regression',
    description: 'Models a linear relationship between scalar response variable and one or more explanatory features using ordinary least squares optimization.',
    mathFoundation: 'y = \\beta_0 + \\sum_{j=1}^p \\beta_j x_j + \\epsilon, \\quad \\hat{\\beta} = (X^T X)^{-1} X^T y',
    pros: ['Highly interpretable coefficients', 'Fast closed-form training', 'Low computational complexity'],
    cons: ['Prone to high bias on non-linear relationships', 'Sensitive to outliers and multicollinearity'],
    useCases: ['House valuation', 'Sales forecasting', 'Risk assessment in financial lending'],
    codeSample: `from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)`,
    hyperparameters: ['fit_intercept', 'normalize', 'positive']
  },
  {
    id: 'logistic-regression',
    name: 'Logistic Regression',
    category: 'Supervised - Classification',
    description: 'Estimates the posterior probability of a binary or multi-class categorical outcome using the sigmoid logistic transformation.',
    mathFoundation: 'P(Y=1|X) = \\frac{1}{1 + e^{-(\\beta^T x)}}, \\quad \\text{Loss} = -\\sum [y \\log(\\hat{y}) + (1-y)\\log(1-\\hat{y})]',
    pros: ['Outputs calibrated probabilities', 'Easy to regularize (L1/L2)', 'Baseline classifier standard'],
    cons: ['Assumes linear decision boundaries in log-odds space', 'Underperforms with complex interactions'],
    useCases: ['Spam email detection', 'Credit card default probability', 'Customer churn classification'],
    codeSample: `from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(C=1.0, penalty='l2')
clf.fit(X_train, y_train)
probabilities = clf.predict_proba(X_test)`,
    hyperparameters: ['C (inverse regularization)', 'penalty (l1, l2, elasticnet)', 'solver (lbfgs, saga)']
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree (CART)',
    category: 'Supervised - Both',
    description: 'Recursive binary partitioning algorithm that splits data based on feature thresholds maximizing information gain or minimizing Gini impurity.',
    mathFoundation: 'Gini = 1 - \\sum_{k=1}^K p_k^2, \\quad \\text{Entropy} = -\\sum_{k=1}^K p_k \\log_2(p_k)',
    pros: ['Intuitive if-then visual tree', 'Handles numerical and categorical features without scaling', 'Non-linear'],
    cons: ['High variance (easily overfits if unpruned)', 'Unstable to small data perturbations'],
    useCases: ['Medical decision trees', 'Loan approval workflows', 'Rule-based compliance auditing'],
    codeSample: `from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(max_depth=5, min_samples_split=10)
tree.fit(X_train, y_train)`,
    hyperparameters: ['max_depth', 'min_samples_split', 'min_samples_leaf', 'criterion']
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    category: 'Ensemble Methods',
    description: 'Bagging ensemble combining hundreds of decorrelated decision trees built on bootstrap samples with random feature subsets to drastically reduce variance.',
    mathFoundation: '\\hat{f}_{rf}(x) = \\frac{1}{B} \\sum_{b=1}^B T_b(x) \\quad [\\text{Variance} \\propto \\rho \\sigma^2 + \\frac{1-\\rho}{B}\\sigma^2]',
    pros: ['Exceptional out-of-the-box accuracy', 'Resistant to overfitting', 'Provides built-in feature importance'],
    cons: ['Slower inference than single tree', 'Larger memory footprint', 'Black-box compared to single tree'],
    useCases: ['Bioinformatics gene ranking', 'Fraud transaction detection', 'Predictive maintenance'],
    codeSample: `from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, max_features='sqrt', random_state=42)
rf.fit(X_train, y_train)`,
    hyperparameters: ['n_estimators', 'max_features', 'max_depth', 'min_samples_leaf']
  },
  {
    id: 'svm',
    name: 'Support Vector Machine (SVM)',
    category: 'Supervised - Both',
    description: 'Constructs an optimal maximum-margin hyperplane separating classes in high-dimensional Hilbert spaces using the kernel trick.',
    mathFoundation: '\\min_{w, b} \\frac{1}{2}||w||^2 + C \\sum \\xi_i \\quad \\text{subject to } y_i(w^T \\phi(x_i) + b) \\ge 1 - \\xi_i',
    pros: ['Mathematically guaranteed global optimum', 'Effective in high dimensions (genes/text)', 'Versatile kernels (RBF, Polynomial)'],
    cons: ['O(n²) to O(n³) compute scaling', 'Requires careful feature standardization', 'No native probability output'],
    useCases: ['Handwriting recognition', 'Cancer microarray classification', 'Financial distress forecasting'],
    codeSample: `from sklearn.svm import SVC
svm = SVC(kernel='rbf', C=1.0, gamma='scale')
svm.fit(X_train_scaled, y_train)`,
    hyperparameters: ['C (slack penalty)', 'kernel (linear, poly, rbf)', 'gamma']
  },
  {
    id: 'knn',
    name: 'K-Nearest Neighbors (KNN)',
    category: 'Supervised - Both',
    description: 'Instance-based non-parametric lazy learner classifying queries based on majority vote of the k nearest historical data points in metric space.',
    mathFoundation: 'd(x, x\') = \\sqrt{\\sum_{j=1}^p (x_j - x\'_j)^2} \\quad [\\text{Euclidean Metric}]',
    pros: ['Zero training phase', 'Intuitive geometric logic', 'Naturally adapts to complex decision boundaries'],
    cons: ['Expensive O(n) query time at inference', 'Suffers heavily from curse of dimensionality', 'Sensitive to distance scaling'],
    useCases: ['Recommendation engines', 'Missing value imputation (KNNImputer)', 'Pattern recognition'],
    codeSample: `from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2)
knn.fit(X_train_scaled, y_train)`,
    hyperparameters: ['n_neighbors', 'weights (uniform, distance)', 'metric']
  },
  {
    id: 'naive-bayes',
    name: 'Naive Bayes Classifier',
    category: 'Supervised - Classification',
    description: 'Probabilistic classifier based on Bayes theorem with the strong naive assumption that all predictor features are conditionally independent given class label.',
    mathFoundation: 'P(y|x_1,\\dots,x_p) \\propto P(y) \\prod_{j=1}^p P(x_j|y)',
    pros: ['Ultra-fast training and inference', 'Requires minimal training data', 'State-of-the-art baseline for text NLP'],
    cons: ['Independent feature assumption is often violated in reality', 'Zero-frequency problem requires Laplace smoothing'],
    useCases: ['Spam filtering', 'Sentiment analysis', 'Real-time document categorization'],
    codeSample: `from sklearn.naive_bayes import MultinomialNB
nb = MultinomialNB(alpha=1.0)
nb.fit(X_train_tfidf, y_train)`,
    hyperparameters: ['alpha (additive smoothing)', 'fit_prior']
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    category: 'Unsupervised - Clustering',
    description: 'Iterative partitioning algorithm alternating between assigning points to the nearest centroid and recalculating centroids to minimize within-cluster variance.',
    mathFoundation: '\\arg\\min_S \\sum_{i=1}^k \\sum_{x \\in S_i} ||x - \\mu_i||^2',
    pros: ['Scales linearly O(k * n * d)', 'Easy to comprehend and deploy', 'Guaranteed local convergence'],
    cons: ['Requires specifying k upfront', 'Assumes spherical clusters of equal size', 'Sensitive to initial centroid seeding'],
    useCases: ['Customer segmentation', 'Color quantization in computer vision', 'Document topic clustering'],
    codeSample: `from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)
cluster_labels = kmeans.fit_predict(X_scaled)`,
    hyperparameters: ['n_clusters', 'init (k-means++, random)', 'max_iter']
  },
  {
    id: 'pca',
    name: 'Principal Component Analysis (PCA)',
    category: 'Unsupervised - Dimensionality Reduction',
    description: 'Orthogonal linear transformation projecting data onto principal axes maximizing empirical variance and eliminating covariance.',
    mathFoundation: '\\Sigma = \\frac{1}{n} X^T X = V \\Lambda V^T, \\quad Z = X V_k',
    pros: ['Removes multicollinearity', 'Compresses high-dimensional data', 'Enables 2D/3D visualization of complex spaces'],
    cons: ['Principal components lose direct physical interpretability', 'Assumes linear variance capture only'],
    useCases: ['Visualizing high-dimensional embeddings', 'Facial recognition (Eigenfaces)', 'Data compression'],
    codeSample: `from sklearn.decomposition import PCA
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X_scaled)`,
    hyperparameters: ['n_components', 'svd_solver', 'whiten']
  },
  {
    id: 'gradient-boosting',
    name: 'Gradient Boosting (GBM / XGBoost)',
    category: 'Ensemble Methods',
    description: 'Sequential boosting technique where each successive shallow tree is fitted to the negative gradient (pseudo-residuals) of the loss function.',
    mathFoundation: 'F_m(x) = F_{m-1}(x) + \\gamma_m h_m(x) \\quad [h_m \\text{ fits } -\\nabla_F L(y, F_{m-1}(x))]',
    pros: ['State-of-the-art tabular accuracy', 'Handles mixed data types', 'Native support for regularization (L1/L2) in XGBoost'],
    cons: ['Prone to overfitting if learning rate is too high', 'Harder to tune than Random Forest', 'Higher training time'],
    useCases: ['Kaggle competitions', 'Ad click-through rate (CTR) prediction', 'Search engine ranking'],
    codeSample: `from sklearn.ensemble import GradientBoostingClassifier
gbm = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3)
gbm.fit(X_train, y_train)`,
    hyperparameters: ['learning_rate', 'n_estimators', 'max_depth', 'subsample']
  }
];

export const ML_GLOSSARY: GlossaryItem[] = [
  {
    term: 'Feature',
    category: 'Data',
    definition: 'An individual measurable property, characteristic, or attribute of a phenomenon being observed and fed into a model (an independent variable X).',
    example: 'In house price prediction: square footage, number of bedrooms, and zip code are features.'
  },
  {
    term: 'Label / Target',
    category: 'Data',
    definition: 'The true output variable y that a supervised machine learning model is trained to predict.',
    example: 'In medical diagnosis: whether a patient has diabetes (1) or does not (0).'
  },
  {
    term: 'Training Set',
    category: 'Dataset',
    definition: 'The subset of historical data provided to the learning algorithm to calculate and fit model parameters (weights and biases).',
    example: 'Typically 70% to 80% of the complete cleaned dataset.'
  },
  {
    term: 'Testing Set',
    category: 'Dataset',
    definition: 'A distinct holdout partition never seen during training or tuning, reserved solely for unbiased evaluation of the final model.',
    example: 'Evaluating final model generalization on 20% unseen test observations.'
  },
  {
    term: 'Validation Set',
    category: 'Dataset',
    definition: 'A partition used during model development to tune hyperparameters and guide early stopping without leaking test set evaluation.',
    example: 'Comparing 5 different neural network architectures on the validation split.'
  },
  {
    term: 'Epoch',
    category: 'Training',
    definition: 'One complete forward and backward pass of the entire training dataset through the machine learning model.',
    example: 'Training a neural network for 50 epochs means the model sees each training sample 50 times.'
  },
  {
    term: 'Batch Size',
    category: 'Training',
    definition: 'The number of training samples processed in one forward/backward pass before updating the model weights in Mini-Batch Gradient Descent.',
    example: 'Using a batch size of 32 or 64 to balance GPU memory bandwidth and gradient noise.'
  },
  {
    term: 'Learning Rate (η)',
    category: 'Optimization',
    definition: 'A crucial hyperparameter determining the step size taken towards a minimum of a loss function at each iteration.',
    formulaOrIntuition: 'w = w - \\eta \\cdot \\nabla L(w)',
    example: 'Too large: gradient descent oscillates and diverges. Too small: training takes days to converge.'
  },
  {
    term: 'Loss Function',
    category: 'Optimization',
    definition: 'A mathematical formula that calculates the discrepancy between the model\'s predicted output and the true label for a single observation.',
    formulaOrIntuition: 'MSE = \\frac{1}{n} \\sum (y_i - \\hat{y}_i)^2',
    example: 'Cross-entropy loss for categorical classification, Mean Squared Error for continuous regression.'
  },
  {
    term: 'Gradient Descent',
    category: 'Optimization',
    definition: 'A first-order iterative optimization algorithm for finding a local minimum of a differentiable objective function by stepping opposite to the gradient vector.',
    formulaOrIntuition: '\\theta_{t+1} = \\theta_t - \\alpha \\nabla_\\theta J(\\theta)',
    example: 'Optimizing millions of weights in deep networks using backpropagation gradients.'
  },
  {
    term: 'Overfitting',
    category: 'Diagnostics',
    definition: 'When a model learns the detailed noise and idiosyncratic fluctuations of the training data rather than the underlying pattern, leading to poor test generalization.',
    example: 'Model scores 99% accuracy on training data but drops to 65% on the test split.'
  },
  {
    term: 'Underfitting',
    category: 'Diagnostics',
    definition: 'When a model is too simple to capture the underlying structure of the data, resulting in poor performance on both training and test data.',
    example: 'Fitting a straight line (linear regression) to an inherently parabolic or circular dataset.'
  },
  {
    term: 'Bias',
    category: 'Theory',
    definition: 'Error introduced by approximating a complicated real-world problem with a model that makes overly simplistic assumptions.',
    example: 'Assuming all customer buying patterns are strictly linear.'
  },
  {
    term: 'Variance',
    category: 'Theory',
    definition: 'The amount by which the model prediction would fluctuate if we estimated it using a different training data set.',
    example: 'A deep unpruned decision tree that changes drastically if even 10 training samples are altered.'
  },
  {
    term: 'Confusion Matrix',
    category: 'Evaluation',
    definition: 'A specific table layout displaying performance metrics for a classification model by comparing actual vs predicted classes (TP, FP, TN, FN).',
    formulaOrIntuition: '[[TP, FN], [FP, TN]]',
    example: 'Showing how many fraudulent transactions were correctly caught vs missed.'
  },
  {
    term: 'Precision',
    category: 'Evaluation',
    definition: 'Out of all instances the model predicted as positive, the fraction that were actually positive.',
    formulaOrIntuition: '\\text{Precision} = \\frac{TP}{TP + FP}',
    example: 'Out of 100 emails classified as spam, 95 were truly spam (95% precision).'
  },
  {
    term: 'Recall (Sensitivity)',
    category: 'Evaluation',
    definition: 'Out of all actual positive instances in reality, the fraction that the model succeeded in identifying.',
    formulaOrIntuition: '\\text{Recall} = \\frac{TP}{TP + FN}',
    example: 'A COVID-19 test detecting 98 out of 100 infected patients (98% recall).'
  },
  {
    term: 'F1 Score',
    category: 'Evaluation',
    definition: 'The harmonic mean of precision and recall, providing a balanced metric especially on imbalanced datasets.',
    formulaOrIntuition: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
    example: 'Essential metric for rare fraud detection where accuracy can be deceptively high (99.9%).'
  },
  {
    term: 'ROC-AUC',
    category: 'Evaluation',
    definition: 'Receiver Operating Characteristic Area Under the Curve measuring the model\'s ability to discriminate between positive and negative classes across all possible probability thresholds.',
    formulaOrIntuition: 'AUC = 1.0 (perfect), AUC = 0.5 (random guess)',
    example: 'Comparing diagnostic power between two medical biomarker models.'
  },
  {
    term: 'Hyperparameter',
    category: 'Tuning',
    definition: 'A configuration variable whose value is set before the learning process begins, controlling the algorithm behavior (unlike internal weights which are learned).',
    example: '`n_estimators` in Random Forest, `learning_rate` in SGD, or `k` in KNN.'
  },
  {
    term: 'Regularization',
    category: 'Modeling',
    definition: 'Techniques that penalize model complexity to prevent overfitting and encourage simpler, more generalizable hypotheses.',
    formulaOrIntuition: 'L1 (Lasso): +\\lambda \\sum |w_j|, \\quad L2 (Ridge): +\\lambda \\sum w_j^2',
    example: 'L1 promotes sparse feature selection; L2 shrinks weights toward zero.'
  },
  {
    term: 'Cross-Validation',
    category: 'Evaluation',
    definition: 'A statistical resampling procedure that divides data into K folds, training on K-1 folds and testing on the remaining fold K times to get an unbiased performance estimate.',
    example: '5-fold Cross-Validation gives a reliable mean and standard deviation of model accuracy.'
  }
];

export const ML_ROADMAP: RoadmapStep[] = [
  {
    step: 1,
    title: 'Python for Machine Learning',
    duration: '2-3 Weeks',
    description: 'Master the fundamental programming language of AI and ML, with focus on vectorization and data manipulation.',
    topics: ['Python OOP', 'NumPy vectorization', 'Pandas DataFrames', 'Matplotlib & Seaborn visualization'],
    tools: ['Python 3.11+', 'Jupyter Notebook', 'NumPy', 'Pandas'],
    projectIdea: 'Exploratory Data Analysis (EDA) of the Titanic dataset with interactive charts.'
  },
  {
    step: 2,
    title: 'Mathematics & Statistics for ML',
    duration: '3-4 Weeks',
    description: 'Understand the mathematical bedrock that powers optimization, probabilistic reasoning, and matrix transformations.',
    topics: ['Linear Algebra (Vectors, Matrices, Eigenvalues)', 'Multivariate Calculus (Partial Derivatives, Gradients)', 'Probability & Bayes Theorem', 'Descriptive & Inferential Statistics'],
    tools: ['SciPy', 'SymPy', 'Desmos'],
    projectIdea: 'Code gradient descent from scratch in pure NumPy without using any ML library.'
  },
  {
    step: 3,
    title: 'Data Preprocessing & Cleaning',
    duration: '2 Weeks',
    description: 'Prepare real-world messy, missing, and noisy tabular data for mathematical estimators.',
    topics: ['Missing value handling', 'Outlier detection (IQR, Z-score)', 'Encoding (One-Hot, Ordinal)', 'Feature Scaling (StandardScaler, MinMaxScaler)'],
    tools: ['Scikit-learn Preprocessing', 'Feature-engine'],
    projectIdea: 'Build an automated end-to-end data cleaning pipeline that accepts any CSV file.'
  },
  {
    step: 4,
    title: 'Supervised Learning (Regression & Classification)',
    duration: '4-5 Weeks',
    description: 'Learn the primary workhorse algorithms that predict continuous values and discrete classes.',
    topics: ['Linear & Polynomial Regression', 'Logistic Regression', 'Decision Trees', 'Random Forests', 'Support Vector Machines (SVM)', 'K-Nearest Neighbors (KNN)'],
    tools: ['Scikit-learn', 'XGBoost'],
    projectIdea: 'California Housing Price Predictor using ensemble regression models.'
  },
  {
    step: 5,
    title: 'Unsupervised Learning',
    duration: '2-3 Weeks',
    description: 'Find natural groupings and reduce dimensions without human-annotated labels.',
    topics: ['K-Means & DBSCAN Clustering', 'Hierarchical Clustering', 'PCA (Principal Component Analysis)', 't-SNE & UMAP'],
    tools: ['Scikit-learn', 'UMAP-learn'],
    projectIdea: 'Customer Market Segmentation using K-Means and 2D PCA visualization.'
  },
  {
    step: 6,
    title: 'Model Evaluation & Validation',
    duration: '2 Weeks',
    description: 'Learn how to scientifically prove that your model works and will not fail in production.',
    topics: ['Confusion Matrix & Classification Report', 'Precision, Recall, F1, ROC-AUC', 'K-Fold Cross-Validation', 'Learning Curves & Bias-Variance diagnostics'],
    tools: ['Scikit-learn Metrics', 'Yellowbrick'],
    projectIdea: 'Credit Card Fraud Detector balancing precision and recall on heavily imbalanced data.'
  },
  {
    step: 7,
    title: 'Feature Engineering & Selection',
    duration: '2 Weeks',
    description: 'Create impactful new features and eliminate noisy features to boost model metrics by 10-30%.',
    topics: ['Polynomial features & interactions', 'Domain-specific transformations', 'Recursive Feature Elimination (RFE)', 'SHAP & LIME interpretability'],
    tools: ['SHAP', 'LIME', 'FeatureTools'],
    projectIdea: 'Flight Delay Prediction with temporal feature engineering (cyclical time encoding).'
  },
  {
    step: 8,
    title: 'Deep Learning & Neural Networks',
    duration: '4-6 Weeks',
    description: 'Transition into modern deep learning for unstructured data (images, audio, text).',
    topics: ['Artificial Neural Networks (ANN/MLP)', 'Backpropagation & Optimizers (Adam)', 'CNNs for Computer Vision', 'RNNs/Transformers for sequences'],
    tools: ['PyTorch', 'TensorFlow / Keras', 'Torchvision'],
    projectIdea: 'Brain Tumor or Skin Lesion MRI Classifier using PyTorch transfer learning (ResNet).'
  },
  {
    step: 9,
    title: 'End-to-End ML Capstone Project',
    duration: '3 Weeks',
    description: 'Synthesize everything you have learned into a production-grade problem solver.',
    topics: ['Problem formulation', 'Data collection & pipeline', 'Model benchmarking', 'Hyperparameter tuning with Optuna'],
    tools: ['Git', 'DVC', 'Optuna', 'Weights & Biases'],
    projectIdea: 'Predictive Medical Patient Readmission System with full auditability.'
  },
  {
    step: 10,
    title: 'ML Deployment & MLOps',
    duration: '2-3 Weeks',
    description: 'Package and serve models so real users can interact with predictions via web APIs.',
    topics: ['Model serialization (ONNX/Pickle)', 'REST API building (FastAPI/Express)', 'Docker containerization', 'Model monitoring & data drift'],
    tools: ['Docker', 'FastAPI', 'Express', 'MLflow'],
    projectIdea: 'Containerized ML Microservice serving real-time predictions via REST API with Swagger docs.'
  }
];
