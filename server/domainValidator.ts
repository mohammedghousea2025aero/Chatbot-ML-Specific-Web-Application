/**
 * Machine Learning Domain Knowledge & Validation Engine
 */

export interface ValidationResult {
  isMlDomain: boolean;
  confidence: number;
  matchedKeywords: string[];
  category?: string;
  reason: string;
}

// Extensive list of ML domains, algorithms, mathematical foundations, libraries, and terms
export const ML_KEYWORDS: Record<string, string[]> = {
  fundamentals: [
    'machine learning', 'ml', 'artificial intelligence', 'ai', 'deep learning',
    'supervised learning', 'unsupervised learning', 'reinforcement learning',
    'semi-supervised', 'self-supervised', 'inductive bias', 'learning paradigm',
    'tabular data', 'ground truth', 'target variable', 'dependent variable',
    'independent variable', 'inductive reasoning', 'generalization'
  ],
  algorithms: [
    'linear regression', 'logistic regression', 'decision tree', 'random forest',
    'support vector machine', 'svm', 'k-nearest neighbors', 'knn', 'naive bayes',
    'k-means', 'kmeans', 'pca', 'principal component analysis', 'gradient boosting',
    'xgboost', 'lightgbm', 'catboost', 'adaboost', 'dbscan', 'hierarchical clustering',
    't-sne', 'tsne', 'umap', 'apriori', 'gaussian mixture model', 'gmm', 'isolation forest',
    'ridge regression', 'lasso regression', 'elastic net', 'linear discriminant analysis', 'lda',
    'perceptron', 'multi-layer perceptron', 'mlp', 'ensemble', 'bagging', 'boosting', 'stacking'
  ],
  deep_learning: [
    'neural network', 'ann', 'cnn', 'convolutional neural network', 'rnn', 'recurrent neural network',
    'lstm', 'gru', 'transformer', 'attention mechanism', 'self-attention', 'backpropagation',
    'activation function', 'relu', 'sigmoid', 'tanh', 'softmax', 'leaky relu', 'dropout',
    'batch normalization', 'weight decay', 'loss function', 'cross entropy', 'mean squared error',
    'mse', 'mae', 'gradient descent', 'sgd', 'adam', 'rmsprop', 'learning rate',
    'epoch', 'batch size', 'vanishing gradient', 'exploding gradient', 'embedding',
    'autoencoder', 'vae', 'gan', 'generative adversarial network', 'latent space', 'fine-tuning',
    'transfer learning', 'pretraining', 'llm', 'foundation model', 'vision transformer', 'vit'
  ],
  data_and_preprocessing: [
    'data preprocessing', 'feature engineering', 'feature selection', 'feature extraction',
    'normalization', 'standardization', 'minmaxscaler', 'standardscaler', 'one-hot encoding',
    'label encoding', 'ordinal encoding', 'imputation', 'missing values', 'outlier',
    'data cleaning', 'train test split', 'validation set', 'test set', 'training data',
    'imbalanced dataset', 'smote', 'oversampling', 'undersampling', 'data augmentation',
    'correlation matrix', 'multicollinearity', 'vif', 'variance inflation factor'
  ],
  evaluation_and_tuning: [
    'model evaluation', 'cross-validation', 'k-fold', 'stratified k-fold', 'overfitting',
    'underfitting', 'bias-variance tradeoff', 'bias', 'variance', 'confusion matrix',
    'true positive', 'false positive', 'true negative', 'false negative', 'accuracy',
    'precision', 'recall', 'f1-score', 'f1 score', 'specificity', 'sensitivity',
    'roc-auc', 'roc curve', 'auc', 'pr-auc', 'precision-recall curve', 'log loss',
    'r-squared', 'r2 score', 'adjusted r2', 'rmse', 'hyperparameter tuning',
    'grid search', 'random search', 'bayesian optimization', 'optuna', 'learning curve',
    'validation curve', 'residual plot'
  ],
  reinforcement_learning: [
    'reinforcement learning', 'rl', 'q-learning', 'deep q-network', 'dqn', 'policy gradient',
    'actor-critic', 'a2c', 'a3c', 'ppo', 'proximal policy optimization', 'markov decision process',
    'mdp', 'bellman equation', 'reward function', 'agent', 'environment', 'exploration exploitation',
    'discount factor', 'value function', 'policy'
  ],
  tools_and_libraries: [
    'scikit-learn', 'sklearn', 'pandas', 'numpy', 'scipy', 'pytorch', 'torch',
    'tensorflow', 'keras', 'matplotlib', 'seaborn', 'huggingface', 'xgboost',
    'lightgbm', 'onnx', 'mlflow', 'weights and biases', 'wandb', 'tensorboard'
  ],
  applications_and_deployment: [
    'mlops', 'model deployment', 'ml pipeline', 'feature store', 'data drift',
    'concept drift', 'model inference', 'latency', 'model compression', 'quantization',
    'pruning', 'model monitoring', 'recommendation system', 'collaborative filtering',
    'anomaly detection', 'computer vision', 'natural language processing', 'nlp',
    'object detection', 'sentiment analysis'
  ]
};

// Patterns that indicate obvious non-ML queries
const OBVIOUS_OUT_OF_SCOPE_REGEX = [
  /\b(who won|cricket|football|fifa|ipl|world cup|olympics|sports score|match score)\b/i,
  /\b(birthday (wish|message|card)|happy birthday|anniversary wish|greeting)\b/i,
  /\b(weather in|temperature today|forecast for|rain tomorrow)\b/i,
  /\b(capital of|president of|prime minister of|currency of|population of)\b/i,
  /\b(recipe for|how to cook|bake a cake|ingredients for pizza|food recipe)\b/i,
  /\b(movie ticket|box office|celebrity gossip|actor net worth|hollywood actor)\b/i,
  /\b(horoscope|zodiac sign|astrology today|fortune telling)\b/i,
  /\b(write (me )?a (romantic|love) (poem|letter|story))\b/i,
  /\b(plumbing repair|fix my (toilet|sink|car tire|washing machine))\b/i,
  /\b(buy shoes|flight booking|hotel reservation|train timetable)\b/i
];

/**
 * Validates whether a user query falls within the Machine Learning domain.
 * Optionally incorporates recent conversation history context for follow-up questions.
 */
export function validateMlDomain(query: string, historyContext?: string): ValidationResult {
  const sanitized = query.trim().toLowerCase();
  
  if (!sanitized) {
    return {
      isMlDomain: false,
      confidence: 0,
      matchedKeywords: [],
      reason: 'Empty query received. Please ask a Machine Learning question.'
    };
  }

  // Check obvious out-of-scope triggers
  for (const regex of OBVIOUS_OUT_OF_SCOPE_REGEX) {
    if (regex.test(sanitized)) {
      // Check if user specifically combined it with ML (e.g. "predicting cricket winner using machine learning")
      const hasExplicitMlIntent = /\b(machine learning|predict|model|algorithm|dataset|classifier|train)\b/i.test(sanitized);
      if (!hasExplicitMlIntent) {
        return {
          isMlDomain: false,
          confidence: 0.95,
          matchedKeywords: [],
          reason: 'Query matched clear non-ML conversational domain (sports, trivia, general writing, weather).'
        };
      }
    }
  }

  // Collect matched keywords across categories
  const matchedKeywords: string[] = [];
  let bestCategory = '';
  let maxCategoryMatches = 0;

  for (const [category, keywords] of Object.entries(ML_KEYWORDS)) {
    let categoryMatches = 0;
    for (const kw of keywords) {
      // Whole word boundary check or exact inclusion for multi-word phrases
      const kwRegex = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (kwRegex.test(sanitized)) {
        if (!matchedKeywords.includes(kw)) {
          matchedKeywords.push(kw);
          categoryMatches++;
        }
      }
    }
    if (categoryMatches > maxCategoryMatches) {
      maxCategoryMatches = categoryMatches;
      bestCategory = category;
    }
  }

  // Also check contextual ML phrasing
  const mlPhrases = [
    'fit a model', 'train a model', 'test a model', 'model accuracy',
    'predictive modeling', 'classification problem', 'regression problem',
    'loss is increasing', 'weights and biases', 'feature matrix',
    'target column', 'data science', 'how to train', 'best algorithm for',
    'compare svm', 'difference between l1 and l2', 'why is my model',
    'how does gradient', 'what is overfitting', 'explain random forest',
    'what is a confusion matrix', 'python code for', 'scikit-learn tutorial',
    'k-means clustering', 'how to evaluate'
  ];

  for (const phrase of mlPhrases) {
    if (sanitized.includes(phrase) && !matchedKeywords.includes(phrase)) {
      matchedKeywords.push(phrase);
    }
  }

  // Scoring
  if (matchedKeywords.length >= 1) {
    return {
      isMlDomain: true,
      confidence: Math.min(1.0, 0.7 + matchedKeywords.length * 0.1),
      matchedKeywords,
      category: bestCategory || 'machine_learning',
      reason: `Query verified in Machine Learning domain with matched concepts: [${matchedKeywords.slice(0, 5).join(', ')}]`
    };
  }

  // Question structure checking: general programming/math/learning questions that might be ML-related
  const mlContextHints = /\b(model|predict|train|dataset|features|accuracy|matrix|weights|gradient|cluster|vector|classifier|estimator|scikit|sklearn|pytorch|tensorflow)\b/i;
  if (mlContextHints.test(sanitized)) {
    return {
      isMlDomain: true,
      confidence: 0.65,
      matchedKeywords: ['contextual_ml_intent'],
      category: 'general_ml',
      reason: 'Query contains ML operational keywords and is accepted for processing.'
    };
  }

  // Check if this is a follow-up inquiry with active ML context from previous turns
  if (historyContext) {
    const isFollowUpPattern = /\b(this|that|these|those|it|code|snippet|example|formula|math|hyperparameter|pros and cons|difference|compare|implement|explain more|simpler|elaborate)\b/i.test(sanitized);
    const historyValidation = validateMlDomain(historyContext);
    if (isFollowUpPattern && historyValidation.isMlDomain) {
      return {
        isMlDomain: true,
        confidence: 0.75,
        matchedKeywords: [`followup_to_${historyValidation.category || 'ml'}`],
        category: historyValidation.category || 'conversational_followup',
        reason: `Follow-up question validated within active Machine Learning context (${historyValidation.category}).`
      };
    }
  }

  // If no ML indicators at all and question is general trivia or general task
  return {
    isMlDomain: false,
    confidence: 0.85,
    matchedKeywords: [],
    reason: 'Query contains no recognizable Machine Learning concepts, algorithms, datasets, or evaluation terms.'
  };
}

/**
 * Standard polite out-of-scope response as requested in the specification.
 */
export const OUT_OF_SCOPE_RESPONSE = 
`Sorry, this question is outside my knowledge scope. I am **ML Assistant**, a domain-specific assistant designed exclusively for **Machine Learning** topics.

I can help you with:
- **ML Algorithms**: Linear & Logistic Regression, Decision Trees, Random Forest, SVM, KNN, Naive Bayes, K-Means, PCA, XGBoost, etc.
- **Concepts & Types**: Supervised, Unsupervised, Reinforcement Learning, Neural Networks.
- **Model Training & Evaluation**: Confusion Matrix, ROC-AUC, Overfitting/Underfitting, Cross-Validation.
- **Data Engineering**: Preprocessing, Feature Engineering, Imputation, Normalization.
- **Code & Mathematics**: Python implementations with scikit-learn, PyTorch, NumPy, and loss functions.

*Please feel free to ask any question about Machine Learning!*`;
