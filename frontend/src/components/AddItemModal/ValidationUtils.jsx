// Default form data structure
export const DEFAULT_FORM_DATA = {
	title: "",
	recurrence: "one-time",
	difficulty: 1,
	description: "",
	due: "",
	progress: 0,
	status: "Pending",
	streak: 0,
	countable: false,
	targetCount: 1,
	currentCount: 0,
	weekday: "monday",
	monthday: 1,
  };
  
  // Input validation functions
  export const validateInput = (name, value) => {
	switch (name) {
	  case 'title':
		// Title should not be empty and should be reasonably sized
		return value.trim().length > 0 && value.length <= 100;
	  case 'description':
		// Description can be empty but should have a reasonable size limit
		return value.length <= 500;
	  case 'difficulty':
		// Difficulty should be between 1 and 4
		return value >= 1 && value <= 4 && Number.isInteger(parseFloat(value));
	  case 'progress':
		// Progress should be between 0 and 100
		return value >= 0 && value <= 100 && !isNaN(parseFloat(value));
	  case 'targetCount':
		// Target count should be a positive integer
		return value > 0 && Number.isInteger(parseFloat(value));
	  case 'currentCount':
		// Current count should be a non-negative integer
		return value >= 0 && Number.isInteger(parseFloat(value));
	  case 'streak':
		// Streak should be a non-negative integer
		return value >= 0 && Number.isInteger(parseFloat(value));
	  case 'monthday':
		// Month day should be between 1 and 31
		return value >= 1 && value <= 31 && Number.isInteger(parseFloat(value));
	  default:
		return true;
	}
  };
  
  // Sanitize input to prevent XSS
  export const sanitizeInput = (value) => {
	if (typeof value !== 'string') return value;
	
	// Basic sanitization: replace HTML tags
	return value
	  .replace(/</g, '&lt;')
	  .replace(/>/g, '&gt;')
	  .replace(/"/g, '&quot;')
	  .replace(/'/g, '&#39;');
  };
  
  // Validate all form fields
  export const validateForm = (formData, selectedType, isEditMode, setErrors) => {
	const newErrors = {};
	
	// Check title (required for all types)
	if (!validateInput('title', formData.title)) {
	  newErrors.title = true;
	}
	
	// Check description (optional but validate if present)
	if (formData.description && !validateInput('description', formData.description)) {
	  newErrors.description = true;
	}
	
	// Check difficulty
	if (!validateInput('difficulty', formData.difficulty)) {
	  newErrors.difficulty = true;
	}
	
	// Check progress for projects
	if (selectedType === 'project' && !validateInput('progress', formData.progress)) {
	  newErrors.progress = true;
	}
	
	// Check counts for countable habits
	if (selectedType === 'habit' && formData.countable) {
	  if (!validateInput('targetCount', formData.targetCount)) {
		newErrors.targetCount = true;
	  }
	  if (isEditMode && !validateInput('currentCount', formData.currentCount)) {
		newErrors.currentCount = true;
	  }
	}
	
	// Check streak for habits in edit mode
	if (selectedType === 'habit' && isEditMode && !validateInput('streak', formData.streak)) {
	  newErrors.streak = true;
	}
	
	// Check month day for monthly recurrence
	if (formData.recurrence === 'monthly' && !validateInput('monthday', formData.monthday)) {
	  newErrors.monthday = true;
	}
	
	// Check due date for projects
	if (selectedType === 'project' && formData.recurrence === 'one-time' && !formData.due) {
	  newErrors.due = true;
	}
	
	setErrors(newErrors);
	return Object.keys(newErrors).length === 0;
  };