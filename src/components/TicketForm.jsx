import { useState, useCallback, useMemo } from 'react';

const TicketForm = ({ onAddTicket, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium'
  });
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => ({
    title: !formData.title.trim() ? 'Title is required' : '',
    description: formData.description.length > 1000 ? 'Description is too long' : ''
  }), [formData.title, formData.description]);

  const isValid = useMemo(
    () => !errors.title && !errors.description && formData.title.trim(),
    [errors, formData.title]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isValid) {
      // Mark all fields as touched to show validation errors
      setTouched({
        title: true,
        description: true,
        priority: true
      });
      return;
    }
    
    const newTicket = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    
    onAddTicket(newTicket);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'Medium'
    });
    setTouched({});
  };

  const getInputClass = (fieldName, hasError) => {
    const baseClass = 'form-input';
    const errorClass = hasError ? 'error' : '';
    const touchedClass = touched[fieldName] ? 'touched' : '';
    return `${baseClass} ${errorClass} ${touchedClass}`.trim();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form" noValidate>
      <h2>Create New Ticket</h2>
      
      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
          {touched.title && errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('title', errors.title && touched.title)}
          placeholder="Enter ticket title"
          required
          aria-required="true"
          aria-invalid={!!(touched.title && errors.title)}
          aria-describedby={touched.title && errors.title ? 'title-error' : undefined}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">
          Description
          {touched.description && errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
          <span className="char-count">
            {formData.description.length}/1000
          </span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('description', errors.description && touched.description)}
          placeholder="Enter ticket description"
          rows="4"
          maxLength="1000"
          aria-invalid={!!(touched.description && errors.description)}
          aria-describedby={
            touched.description && errors.description 
              ? 'description-error' 
              : 'description-help'
          }
        />
        <div id="description-help" className="help-text">
          Provide detailed information about the issue
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('priority')}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        className="btn-submit"
        disabled={isLoading || !isValid}
      >
        {isLoading ? 'Creating...' : 'Create Ticket'}
      </button>
    </form>
  );
};

export default TicketForm;
