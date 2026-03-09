import { useState } from "react";
import { createIssue } from "../services/api";
import { useNavigate } from "react-router-dom";

function ReportIssue() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    priority: "Medium",
    images: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const categories = [
    "Infrastructure",
    "Sanitation",
    "Street Lighting",
    "Road Maintenance",
    "Graffiti",
    "Noise Complaint",
    "Park Maintenance",
    "Other"
  ];

  const priorities = [
    { value: "Low", label: "Low", color: "#10b981" },
    { value: "Medium", label: "Medium", color: "#f59e0b" },
    { value: "High", label: "High", color: "#ef4444" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images, ...files].slice(0, 5); // Max 5 images
    setFormData(prev => ({ ...prev, images: newImages }));

    // Create preview URLs
    const previews = newImages.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.category) newErrors.category = "Please select a category";
    } else if (currentStep === 2) {
      if (!formData.location.trim()) newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;

    setLoading(true);

    try {
      // In a real app, you'd upload images first and get URLs
      const issueData = {
        ...formData,
        status: "Pending",
        date: new Date().toISOString(),
        votes: 0,
        // imageUrls: uploadedImageUrls, // You'd get these from your image upload service
      };

      await createIssue(issueData);
      
      // Show success message and redirect
      navigate("/", { 
        state: { 
          success: true, 
          message: "Issue reported successfully! Thank you for making your community better." 
        } 
      });

    } catch (error) {
      console.error("Error reporting issue:", error);
      setErrors({ submit: "Failed to report issue. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Issue Details" },
    { number: 2, label: "Location" },
    { number: 3, label: "Contact Info" },
  ];

  return (
    <div className="report-issue-container">
      {/* Header */}
      <div className="report-header">
        <h1 className="report-title">
          <span className="gradient-text">Report an Issue</span>
        </h1>
        <p className="report-subtitle">
          Help improve your community by reporting issues you've noticed. 
          Our team will review and address them promptly.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        {steps.map((step) => (
          <div key={step.number} className="step-item">
            <div 
              className={`step-circle ${currentStep >= step.number ? 'active' : ''} 
                ${currentStep > step.number ? 'completed' : ''}`}
            >
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className={`step-label ${currentStep >= step.number ? 'active' : ''}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form */}
      <div className="report-form-card">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Issue Details */}
          {currentStep === 1 && (
            <div className="form-step fade-in">
              <h3 className="step-title">Tell us about the issue</h3>
              
              {/* Title */}
              <div className="form-group">
                <label htmlFor="title">
                  Issue Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  placeholder="e.g., Broken street light, Pothole on Main St"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="category">
                  Category <span className="required">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className={`form-select ${errors.category ? 'error' : ''}`}
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              {/* Priority */}
              <div className="form-group">
                <label>Priority Level</label>
                <div className="priority-options">
                  {priorities.map(p => (
                    <label key={p.value} className="priority-option">
                      <input
                        type="radio"
                        name="priority"
                        value={p.value}
                        checked={formData.priority === p.value}
                        onChange={handleInputChange}
                      />
                      <span 
                        className="priority-badge-select"
                        style={{ 
                          backgroundColor: p.value === formData.priority ? p.color + '20' : '#f1f5f9',
                          borderColor: p.value === formData.priority ? p.color : '#e2e8f0',
                          color: p.value === formData.priority ? p.color : '#64748b'
                        }}
                      >
                        {p.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  placeholder="Please provide details about the issue... (e.g., when you noticed it, severity, any safety concerns)"
                  rows="5"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label>Upload Photos (Optional, max 5)</label>
                <div className="image-upload-area">
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <label htmlFor="images" className="upload-label">
                    <div className="upload-icon">📸</div>
                    <div>
                      <p className="upload-text">Click to upload photos</p>
                      <p className="upload-hint">or drag and drop</p>
                    </div>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="image-previews">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="preview-item">
                        <img src={preview} alt={`Preview ${index + 1}`} />
                        <button 
                          type="button" 
                          className="remove-image"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="form-step fade-in">
              <h3 className="step-title">Where is this issue located?</h3>
              
              {/* Location Input */}
              <div className="form-group">
                <label htmlFor="location">
                  Location <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="e.g., 123 Main Street, or intersection of Oak & 5th"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <p>Click to add location on map (coming soon)</p>
              </div>

              <div className="location-tip">
                <span className="tip-icon">💡</span>
                <span className="tip-text">
                  Tip: Be as specific as possible. Include landmarks or nearby intersections.
                </span>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {currentStep === 3 && (
            <div className="form-step fade-in">
              <h3 className="step-title">How can we reach you for updates?</h3>
              
              <div className="contact-info-note">
                <p>Your contact information will only be used for updates about this issue.</p>
              </div>

              {/* Name */}
              <div className="form-group">
                <label htmlFor="contactName">Your Name</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.contactName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="contactEmail">Email Address</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="contactPhone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  className="form-input"
                  placeholder="(555) 123-4567"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                />
              </div>

              {/* Privacy Note */}
              <div className="privacy-note">
                <span className="privacy-icon">🔒</span>
                <span className="privacy-text">
                  Your information is secure and will only be used for issue-related updates.
                </span>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            {currentStep > 1 && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={loading}
              >
                ← Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleNext}
                disabled={loading}
              >
                Continue →
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner-small"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            )}
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="submit-error">
              ⚠️ {errors.submit}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;