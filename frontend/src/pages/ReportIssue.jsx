import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIssues } from "../context/IssueContext";
import { useAuth } from "../context/AuthContext";

function ReportIssue() {
  const navigate = useNavigate();
  const { addIssue } = useIssues();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    priority: "Medium",
    images: [],
    contactName: user?.name || "",
    contactEmail: user?.email || "",
    contactPhone: "",
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: "Infrastructure", icon: "🏗️" },
    { value: "Sanitation", icon: "🗑️" },
    { value: "Street Lighting", icon: "💡" },
    { value: "Road Maintenance", icon: "🛣️" },
    { value: "Graffiti", icon: "🎨" },
    { value: "Noise Complaint", icon: "🔊" },
    { value: "Park Maintenance", icon: "🌳" },
    { value: "Other", icon: "📌" }
  ];

  const priorities = [
    { value: "Low", label: "Low", color: "#10b981", icon: "🟢" },
    { value: "Medium", label: "Medium", color: "#f59e0b", icon: "🟡" },
    { value: "High", label: "High", color: "#ef4444", icon: "🔴" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images, ...files].slice(0, 5);
    setFormData(prev => ({ ...prev, images: newImages }));

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
      // Create the issue data object
      const issueData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        category: formData.category,
        priority: formData.priority,
        reportedBy: formData.contactName || user?.name || 'Anonymous',
        contactEmail: formData.contactEmail || user?.email,
        contactPhone: formData.contactPhone,
        images: imagePreviews, // In real app, you'd upload these to server
        status: "Pending",
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        votes: 0,
        comments: []
      };

      // Use the addIssue function from context
      const result = await addIssue(issueData);
      
      if (result.success) {
        // Navigate to home with success message
        navigate("/", { 
          state: { 
            success: true, 
            message: "Issue reported successfully! Thank you for making your community better." 
          } 
        });
      } else {
        setErrors({ submit: result.error || "Failed to report issue. Please try again." });
      }

    } catch (error) {
      console.error("Error reporting issue:", error);
      setErrors({ submit: "Failed to report issue. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Issue Details", icon: "📋" },
    { number: 2, label: "Location", icon: "📍" },
    { number: 3, label: "Contact", icon: "📞" },
  ];

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "40px 24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100vh",
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "40px",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          margin: "0 0 12px 0",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Report an Issue
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#64748b",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}>
          Help improve your community by reporting issues you've noticed.
          Our team will review and address them promptly.
        </p>
      </div>

      {/* Progress Steps */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "40px",
        position: "relative",
      }}>
        {/* Progress Line */}
        <div style={{
          position: "absolute",
          top: "24px",
          left: "0",
          right: "0",
          height: "2px",
          background: "#e2e8f0",
          zIndex: 1,
        }}>
          <div style={{
            height: "100%",
            width: `${((currentStep - 1) / 2) * 100}%`,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            transition: "width 0.3s ease",
          }} />
        </div>

        {steps.map((step) => (
          <div key={step.number} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: currentStep >= step.number ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "white",
              border: currentStep >= step.number ? "none" : "2px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: currentStep >= step.number ? "white" : "#94a3b8",
              marginBottom: "8px",
              transition: "all 0.3s ease",
            }}>
              {currentStep > step.number ? "✓" : step.icon}
            </div>
            <span style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              color: currentStep >= step.number ? "#0f172a" : "#94a3b8",
            }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form */}
      <div style={{
        background: "white",
        borderRadius: "32px",
        padding: "40px",
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)",
        border: "1px solid #f1f5f9",
      }}>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Issue Details */}
          {currentStep === 1 && (
            <div style={{
              animation: "fadeIn 0.3s ease",
            }}>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 24px 0",
              }}>Tell us about the issue</h3>
              
              {/* Title */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>
                  Issue Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Broken street light, Pothole on Main St"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: `1px solid ${errors.title ? "#ef4444" : "#e2e8f0"}`,
                    borderRadius: "16px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = errors.title ? "#ef4444" : "#e2e8f0"}
                />
                {errors.title && (
                  <span style={{
                    fontSize: "0.85rem",
                    color: "#ef4444",
                    marginTop: "4px",
                    display: "block",
                  }}>{errors.title}</span>
                )}
              </div>

              {/* Category */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>
                  Category <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: "8px",
                }}>
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, category: cat.value }));
                        if (errors.category) setErrors(prev => ({ ...prev, category: null }));
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 12px",
                        background: formData.category === cat.value ? "#3b82f620" : "#f8fafc",
                        border: `1px solid ${formData.category === cat.value ? "#3b82f6" : "#e2e8f0"}`,
                        borderRadius: "40px",
                        fontSize: "0.9rem",
                        color: formData.category === cat.value ? "#1e40af" : "#475569",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.value}</span>
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <span style={{
                    fontSize: "0.85rem",
                    color: "#ef4444",
                    marginTop: "4px",
                    display: "block",
                  }}>{errors.category}</span>
                )}
              </div>

              {/* Priority */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>Priority Level</label>
                <div style={{
                  display: "flex",
                  gap: "12px",
                }}>
                  {priorities.map(p => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: p.value }))}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "12px",
                        background: formData.priority === p.value ? `${p.color}20` : "#f8fafc",
                        border: `1px solid ${formData.priority === p.value ? p.color : "#e2e8f0"}`,
                        borderRadius: "40px",
                        fontSize: "0.95rem",
                        color: formData.priority === p.value ? p.color : "#64748b",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>
                  Description <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide details about the issue... (e.g., when you noticed it, severity, any safety concerns)"
                  rows="5"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: `1px solid ${errors.description ? "#ef4444" : "#e2e8f0"}`,
                    borderRadius: "16px",
                    fontSize: "1rem",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = errors.description ? "#ef4444" : "#e2e8f0"}
                />
                {errors.description && (
                  <span style={{
                    fontSize: "0.85rem",
                    color: "#ef4444",
                    marginTop: "4px",
                    display: "block",
                  }}>{errors.description}</span>
                )}
              </div>

              {/* Image Upload */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>Upload Photos (Optional, max 5)</label>
                
                <div style={{
                  border: "2px dashed #e2e8f0",
                  borderRadius: "20px",
                  padding: "32px",
                  textAlign: "center",
                  background: "#f8fafc",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#3b82f6"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                    <span style={{
                      fontSize: "3rem",
                      display: "block",
                      marginBottom: "12px",
                    }}>📸</span>
                    <p style={{
                      fontSize: "1rem",
                      color: "#0f172a",
                      margin: "0 0 4px 0",
                      fontWeight: "500",
                    }}>Click to upload photos</p>
                    <p style={{
                      fontSize: "0.85rem",
                      color: "#94a3b8",
                      margin: 0,
                    }}>or drag and drop</p>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "12px",
                    marginTop: "20px",
                  }}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: "12px",
                        overflow: "hidden",
                      }}>
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "rgba(0,0,0,0.5)",
                            border: "none",
                            color: "white",
                            fontSize: "1rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
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
            <div style={{
              animation: "fadeIn 0.3s ease",
            }}>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 24px 0",
              }}>Where is this issue located?</h3>
              
              {/* Location Input */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>
                  Location <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main Street, or intersection of Oak & 5th"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: `1px solid ${errors.location ? "#ef4444" : "#e2e8f0"}`,
                    borderRadius: "16px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = errors.location ? "#ef4444" : "#e2e8f0"}
                />
                {errors.location && (
                  <span style={{
                    fontSize: "0.85rem",
                    color: "#ef4444",
                    marginTop: "4px",
                    display: "block",
                  }}>{errors.location}</span>
                )}
              </div>

              {/* Map Placeholder */}
              <div style={{
                background: "linear-gradient(135deg, #667eea10, #764ba210)",
                borderRadius: "20px",
                padding: "40px",
                textAlign: "center",
                marginBottom: "20px",
              }}>
                <span style={{
                  fontSize: "3rem",
                  display: "block",
                  marginBottom: "12px",
                }}>🗺️</span>
                <p style={{
                  color: "#475569",
                  margin: 0,
                }}>Click to add location on map (coming soon)</p>
              </div>

              {/* Tip */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: "#fff3cd",
                borderRadius: "40px",
                color: "#856404",
              }}>
                <span style={{ fontSize: "1.2rem" }}>💡</span>
                <span style={{ fontSize: "0.9rem" }}>
                  Tip: Be as specific as possible. Include landmarks or nearby intersections.
                </span>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {currentStep === 3 && (
            <div style={{
              animation: "fadeIn 0.3s ease",
            }}>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 24px 0",
              }}>How can we reach you?</h3>
              
              <div style={{
                background: "#e6f7ff",
                padding: "16px",
                borderRadius: "16px",
                marginBottom: "24px",
              }}>
                <p style={{
                  margin: 0,
                  color: "#0066cc",
                  fontSize: "0.95rem",
                }}>
                  Your contact information will only be used for updates about this issue.
                </p>
              </div>

              {/* Name */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>Your Name</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>Email Address</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#475569",
                  marginBottom: "8px",
                }}>Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              {/* Privacy Note */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: "#f1f5f9",
                borderRadius: "40px",
                color: "#475569",
              }}>
                <span style={{ fontSize: "1.2rem" }}>🔒</span>
                <span style={{ fontSize: "0.9rem" }}>
                  Your information is secure and will only be used for issue-related updates.
                </span>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid #f1f5f9",
          }}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "14px 24px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "40px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#475569",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                ← Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                style={{
                  flex: currentStep > 1 ? 1 : "none",
                  width: currentStep === 1 ? "100%" : "auto",
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  border: "none",
                  borderRadius: "40px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 10px 20px -10px rgba(59,130,246,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  border: "none",
                  borderRadius: "40px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "white",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid white",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }} />
                    Submitting...
                  </span>
                ) : (
                  'Submit Report'
                )}
              </button>
            )}
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div style={{
              marginTop: "20px",
              padding: "12px 16px",
              background: "#fee2e2",
              borderRadius: "12px",
              color: "#b91c1c",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span>⚠️</span>
              <span>{errors.submit}</span>
            </div>
          )}
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default ReportIssue;