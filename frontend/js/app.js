const API_BASE = "http://localhost:8000/api";

// --- Tamil Nadu Complete Location Map ---
const TAMIL_NADU_LOCATIONS = {
    "Ariyalur": ["Ariyalur", "Jayankondam", "Sendurai", "Tirumanur"],
    "Chengalpattu": ["Chengalpattu", "Tambaram", "Pallavaram", "Chromepet", "Madhuranthakam"],
    "Chennai": ["T Nagar", "Adyar", "Velachery", "Anna Nagar", "Mylapore", "Royapettah", "Nungambakkam", "Tambaram"],
    "Coimbatore": ["Gandhipuram", "RS Puram", "Peelamedu", "Pollachi", "Mettupalayam", "Singanallur"],
    "Cuddalore": ["Cuddalore", "Chidambaram", "Panruti", "Neyveli", "Virudhachalam"],
    "Dharmapuri": ["Dharmapuri", "Harur", "Palacode", "Pennagaram"],
    "Dindigul": ["Dindigul", "Palani", "Kodaikanal", "Oddanchatram", "Natham"],
    "Erode": ["Erode", "Gobichettipalayam", "Bhavani", "Perundurai", "Sathy"],
    "Kallakurichi": ["Kallakurichi", "Sankarapuram", "Ulundurpet", "Chinnasalem"],
    "Kanchipuram": ["Kanchipuram", "Sriperumbudur", "Walajabad", "Kundrathur"],
    "Kanyakumari": ["Nagercoil", "Kanyakumari", "Marthandam", "Thuckalay", "Colachel"],
    "Karur": ["Karur", "Kulithalai", "Aravakurichi", "Pallapatti"],
    "Krishnagiri": ["Krishnagiri", "Hosur", "Denkanikottai", "Pochampalli", "Uthangarai"],
    "Madurai": ["Anna Nagar", "KK Nagar", "Melur", "Usilampatti", "Thirumangalam", "Tallakulam"],
    "Mayiladuthurai": ["Mayiladuthurai", "Sirkazhi", "Tharangambadi", "Kuthalam"],
    "Nagapattinam": ["Nagapattinam", "Velankanni", "Vedaranyam", "Thirukkuvalai"],
    "Namakkal": ["Namakkal", "Rasipuram", "Tiruchengode", "Komarapalayam", "Sendamangalam"],
    "Nilgiris": ["Ooty", "Coonoor", "Kotagiri", "Gudalur"],
    "Perambalur": ["Perambalur", "Veppanthattai", "Alathur", "Kunnam"],
    "Pudukkottai": ["Pudukkottai", "Aranthangi", "Alangudi", "Illuppur"],
    "Ramanathapuram": ["Ramanathapuram", "Rameswaram", "Paramakudi", "Keezhakarai", "Tiruvadanai"],
    "Ranipet": ["Ranipet", "Arakkonam", "Arcot", "Walajapet", "Sholinghur"],
    "Salem": ["Salem", "Attur", "Mettur", "Omalur", "Yercaud", "Elampillai"],
    "Sivaganga": ["Sivaganga", "Karaikudi", "Devakottai", "Manamadurai", "Tiruppattur"],
    "Tenkasi": ["Tenkasi", "Sankarankovil", "Kadayanallur", "Shenkottai", "Alangulam"],
    "Thanjavur": ["Thanjavur", "Kumbakonam", "Pattukkottai", "Orathanadu", "Thiruvaiyaru"],
    "Theni": ["Theni", "Bodinayakanur", "Cumbum", "Periyakulam", "Andipatti"],
    "Thoothukudi": ["Thoothukudi", "Kovilpatti", "Tiruchendur", "Kayalpattinam", "Eral"],
    "Tiruchirappalli": ["Srirangam", "Trichy", "Thiruverumbur", "Lalgudi", "Manapparai", "Thuraiyur"],
    "Tirunelveli": ["Tirunelveli", "Palayamkottai", "Ambasamudram", "Nanguneri", "Valliyur"],
    "Tirupathur": ["Tirupathur", "Vaniyambadi", "Ambur", "Natrampalli"],
    "Tiruppur": ["Tiruppur", "Dharapuram", "Palladam", "Udusalpet", "Avinashi", "Kangeyam"],
    "Tiruvallur": ["Tiruvallur", "Avadi", "Ambattur", "Ponneri", "Gummidipoondi"],
    "Tiruvannamalai": ["Tiruvannamalai", "Arani", "Cheyyar", "Polur", "Chengam"],
    "Tiruvarur": ["Tiruvarur", "Mannargudi", "Thiruthuraipoondi", "Nannilam", "Kudavasal"],
    "Vellore": ["Vellore", "Katpadi", "Gudiyatham", "Pernambut"],
    "Viluppuram": ["Viluppuram", "Tindivanam", "Gingee", "Vikravandi", "Marakkanam"],
    "Virudhunagar": ["Sivakasi", "Rajapalayam", "Sattur", "Srivilliputhur", "Virudhunagar", "Aruppukkottai"]
};

// --- Mobile Navigation ---
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// --- Admin Mobile Sidebar Toggle ---
const adminHamburger = document.getElementById('admin-hamburger');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

if (adminHamburger && sidebar) {
    adminHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });
}

if (sidebar && mainContent) {
    mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// --- Authentication ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        try {
            const response = await fetch(`${API_BASE}/admin/login`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('admin_id', data.admin_id);
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginError').textContent = data.detail || 'Login failed';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('loginError').textContent = 'Server error. Please try again later.';
        }
    });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('admin_id');
        window.location.href = '../../index.html';
    });
}

// --- Dynamic Dropdown for Submit Form ---
document.addEventListener("DOMContentLoaded", () => {
    const districtSelect = document.getElementById("district");
    const citySelect = document.getElementById("city");
    
    if (districtSelect && citySelect) {
        districtSelect.addEventListener("change", () => {
            const district = districtSelect.value;
            citySelect.innerHTML = '<option value="">Select City/Town</option>';
            
            if (district && TAMIL_NADU_LOCATIONS[district]) {
                citySelect.disabled = false;
                TAMIL_NADU_LOCATIONS[district].forEach(city => {
                    const opt = document.createElement("option");
                    opt.value = city;
                    opt.textContent = city;
                    citySelect.appendChild(opt);
                });
            } else {
                citySelect.disabled = true;
            }
        });
    }

    // Custom File Upload Dynamic Visual Feedback
    const fileInput = document.getElementById("evidence");
    const uploadContainer = document.getElementById("fileUploadContainer");
    const uploadLabel = document.getElementById("fileUploadLabel");
    const uploadSubtext = document.getElementById("fileUploadSubtext");
    
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const imagePreview = document.getElementById("imagePreview");
    
    if (fileInput && uploadContainer && uploadLabel && uploadSubtext) {
        fileInput.addEventListener("change", () => {
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const fileName = file.name;
                uploadContainer.classList.add("file-uploaded-state");
                uploadLabel.innerHTML = `<i class="fas fa-paperclip"></i> ${fileName}`;
                uploadSubtext.innerHTML = '<i class="fas fa-check-circle"></i> File selected successfully (Click to replace)';
                
                // If it's an image, show preview
                if (file.type.startsWith("image/") && imagePreviewContainer && imagePreview) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imagePreview.src = e.target.result;
                        imagePreviewContainer.classList.remove("hidden");
                    };
                    reader.readAsDataURL(file);
                } else {
                    if (imagePreviewContainer) imagePreviewContainer.classList.add("hidden");
                    if (imagePreview) imagePreview.src = "";
                }
            } else {
                uploadContainer.classList.remove("file-uploaded-state");
                uploadLabel.innerHTML = 'Upload Evidence (Image/PDF)';
                uploadSubtext.innerHTML = 'Optional - Drag and drop or click to upload';
                if (imagePreviewContainer) imagePreviewContainer.classList.add("hidden");
                if (imagePreview) imagePreview.src = "";
            }
        });
    }
});

// --- Citizen Submission ---
const complaintForm = document.getElementById('complaintForm');
if (complaintForm) {
    complaintForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Form validation for phone number alone (exactly 10 digits starting with 6-9)
        const phoneInput = document.getElementById('phone_number');
        if (phoneInput) {
            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phoneValue)) {
                alert('Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.');
                phoneInput.focus();
                return;
            }
        }

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        const formData = new FormData(complaintForm);
        try {
            const response = await fetch(`${API_BASE}/complaints/submit`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (response.ok) {
                complaintForm.classList.add('hidden');
                const resultDiv = document.getElementById('submissionResult');
                resultDiv.classList.remove('hidden');
                
                try {
                    const ticketIdSpan = document.getElementById('resultTicketId');
                    if (ticketIdSpan) {
                        ticketIdSpan.textContent = data.ticket_id || '';
                    }
                    
                    const catSpan = document.getElementById('resCategory');
                    if (catSpan && data.prediction && data.prediction.category) {
                        catSpan.textContent = data.prediction.category;
                    }
                    
                    const urgSpan = document.getElementById('resUrgency');
                    if (urgSpan && data.prediction && data.prediction.urgency) {
                        urgSpan.textContent = data.prediction.urgency;
                        urgSpan.className = `badge ${data.prediction.urgency.toLowerCase()}`;
                    }
                    
                    const scoreSpan = document.getElementById('resUrgencyScore');
                    if (scoreSpan && data.prediction && data.prediction.priority_score !== undefined) {
                        scoreSpan.textContent = `${data.prediction.priority_score} / 100`;
                        if (data.prediction.urgency) {
                            scoreSpan.className = `badge ${data.prediction.urgency.toLowerCase()}`;
                        }
                    }
                    
                    const resEvidenceContainer = document.getElementById('resEvidenceContainer');
                    const resEvidenceContent = document.getElementById('resEvidenceContent');
                    if (resEvidenceContainer && resEvidenceContent) {
                        if (data.evidence_path) {
                            resEvidenceContainer.classList.remove('hidden');
                            const isPdf = String(data.evidence_path).toLowerCase().endsWith('.pdf');
                            const fullUrl = `${API_BASE.replace('/api', '')}${data.evidence_path}`;
                            
                            // Use the local preview image if available to avoid CORS/mixed-content network issues, otherwise fallback to the uploaded URL
                            const imagePreview = document.getElementById('imagePreview');
                            const localImageSrc = (imagePreview && imagePreview.src && imagePreview.src.startsWith('data:')) ? imagePreview.src : fullUrl;
                            
                            resEvidenceContent.innerHTML = isPdf ? 
                                `<a href="${fullUrl}" target="_blank" class="btn-outline" style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.5rem 1rem; font-size:0.85rem; border-radius:6px; text-decoration:none;"><i class="fas fa-file-pdf" style="color:var(--danger); font-size:1.1rem;"></i> View Evidence PDF</a>` :
                                `<img src="${localImageSrc}" style="max-width:100%; max-height:180px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer; box-shadow:var(--shadow-sm);" onclick="window.open('${fullUrl}')" title="Click to view full image" alt="Evidence">`;
                        } else {
                            resEvidenceContainer.classList.add('hidden');
                            resEvidenceContent.innerHTML = '';
                        }
                    }
                } catch (domError) {
                    console.error('Error updating success DOM:', domError);
                }
                
            } else {
                alert('Failed to submit: ' + (data.detail || 'Unknown error'));
                submitBtn.textContent = 'Submit Grievance';
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error during grievance submission:', error);
            alert('Submission Error:\n' + error.name + ': ' + error.message + '\n\nStack:\n' + (error.stack || 'No stack trace available'));
            submitBtn.textContent = 'Submit Grievance';
            submitBtn.disabled = false;
        }
    });
}

// --- Dashboard Loading ---
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE}/dashboard/stats`);
        const data = await response.json();
        
        document.getElementById('totalComplaints').textContent = data.total_complaints;
        document.getElementById('highPriority').textContent = data.high_priority;
        document.getElementById('resolvedComplaints').textContent = data.resolved;
        document.getElementById('pendingComplaints').textContent = data.pending;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadCharts() {
    try {
        const chartCommonPlugins = {
            legend: {
                labels: {
                    color: '#94a3b8',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11
                    }
                }
            }
        };

        // District Chart
        const distRes = await fetch(`${API_BASE}/analytics/district`);
        const distData = await distRes.json();
        const distCtx = document.getElementById('districtChart');
        if (distCtx) {
            new Chart(distCtx, {
                type: 'bar',
                data: {
                    labels: distData.map(d => d.district),
                    datasets: [{
                        label: 'Complaints',
                        data: distData.map(d => d.count),
                        backgroundColor: 'rgba(43, 108, 176, 0.7)',
                        borderColor: 'rgba(43, 108, 176, 1)',
                        borderWidth: 1
                    }]
                },
                options: { 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: chartCommonPlugins,
                    scales: {
                        x: {
                            ticks: {
                                color: '#94a3b8',
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45,
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 9
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#94a3b8',
                                precision: 0,
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 10
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            }
                        }
                    }
                }
            });
        }

        // Category Chart
        const catRes = await fetch(`${API_BASE}/analytics/category`);
        const catData = await catRes.json();
        const catCtx = document.getElementById('categoryChart');
        if (catCtx) {
            new Chart(catCtx, {
                type: 'doughnut',
                data: {
                    labels: catData.map(d => d.category),
                    datasets: [{
                        data: catData.map(d => d.count),
                        backgroundColor: [
                            '#ed8936', '#48bb78', '#3182ce', '#e53e3e', '#805ad5', '#38b2ac'
                        ]
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: chartCommonPlugins
                }
            });
        }

        // City-wise Chart
        const cityRes = await fetch(`${API_BASE}/analytics/city`);
        const cityData = await cityRes.json();
        const cityCtx = document.getElementById('cityChart');
        if (cityCtx) {
            new Chart(cityCtx, {
                type: 'bar',
                data: {
                    labels: cityData.map(c => c.city),
                    datasets: [{
                        label: 'Complaints',
                        data: cityData.map(c => c.count),
                        backgroundColor: 'rgba(124, 58, 237, 0.7)',
                        borderColor: 'rgba(124, 58, 237, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: chartCommonPlugins,
                    scales: {
                        x: {
                            ticks: {
                                color: '#94a3b8',
                                autoSkip: true,
                                maxRotation: 45,
                                minRotation: 45,
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 9
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { 
                                color: '#94a3b8',
                                precision: 0,
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 10
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            }
                        }
                    }
                }
            });
        }

        // High Complaint Regions list
        const regionsRes = await fetch(`${API_BASE}/analytics/high-regions`);
        const regionsData = await regionsRes.json();
        const regionsList = document.getElementById('highComplaintRegionsList');
        if (regionsList) {
            regionsList.innerHTML = '';
            if (regionsData.length === 0) {
                regionsList.innerHTML = '<div style="color:var(--text-secondary); text-align:center; padding:1.5rem;">No region statistics available yet.</div>';
            } else {
                regionsData.forEach(r => {
                    const item = document.createElement('div');
                    item.className = 'region-item';
                    item.style = 'display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; background:#f8fafc; border-radius:8px; border-left:4px solid var(--accent-color); margin-bottom:0.75rem; box-shadow:var(--shadow-sm);';
                    item.innerHTML = `
                        <div>
                            <strong style="color:var(--text-primary); font-size:0.95rem;">${r.city}</strong>
                            <span style="color:var(--text-secondary); font-size:0.8rem; margin-left:0.5rem;">(${r.district} Dist)</span>
                        </div>
                        <span class="badge critical" style="font-weight:600; font-size:0.75rem;">${r.count} Grievances</span>
                    `;
                    regionsList.appendChild(item);
                });
            }
        }

        // Trend Chart
        const trendRes = await fetch(`${API_BASE}/analytics/trend`);
        const trendData = await trendRes.json();
        const trendCtx = document.getElementById('trendChart');
        if (trendCtx) {
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: trendData.map(d => d.month),
                    datasets: [{
                        label: 'Complaints Trend',
                        data: trendData.map(d => d.count),
                        borderColor: '#ed8936',
                        tension: 0.3,
                        fill: false
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: chartCommonPlugins,
                    scales: {
                        x: {
                            ticks: {
                                color: '#94a3b8',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 10
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#94a3b8',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 10
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            }
                        }
                    }
                }
            });
        }

    } catch (error) {
        console.error('Error loading charts:', error);
    }
}

// --- Complaints List ---
let allComplaints = [];
let allGroupedComplaints = [];
let groupedMode = false;
let complaintsFiltersInitialized = false;

async function loadComplaints() {
    try {
        const url = groupedMode ? `${API_BASE}/complaints/grouped` : `${API_BASE}/complaints`;
        const response = await fetch(url);
        const fetchedData = await response.json();
        
        if (groupedMode) {
            allGroupedComplaints = fetchedData;
        } else {
            allComplaints = fetchedData;
        }
        
        filterAndRenderComplaints();
        
        // Setup filters
        const searchBox = document.getElementById('searchBox');
        const filterDistrict = document.getElementById('filterDistrict');
        const filterCity = document.getElementById('filterCity');
        const filterUrgency = document.getElementById('filterUrgency');
        const filterCategory = document.getElementById('filterCategory');
        const filterStatus = document.getElementById('filterStatus');
        
        if (!complaintsFiltersInitialized) {
            // Populate districts in filters dynamically
            if (filterDistrict) {
                filterDistrict.innerHTML = '<option value="">All Districts</option>';
                Object.keys(TAMIL_NADU_LOCATIONS).sort().forEach(dist => {
                    const opt = document.createElement('option');
                    opt.value = dist;
                    opt.textContent = dist;
                    filterDistrict.appendChild(opt);
                });
                
                filterDistrict.addEventListener('change', () => {
                    const dist = filterDistrict.value;
                    if (filterCity) {
                        filterCity.innerHTML = '<option value="">All Cities/Towns</option>';
                        if (dist && TAMIL_NADU_LOCATIONS[dist]) {
                            filterCity.disabled = false;
                            TAMIL_NADU_LOCATIONS[dist].forEach(city => {
                                const opt = document.createElement('option');
                                opt.value = city;
                                opt.textContent = city;
                                filterCity.appendChild(opt);
                            });
                        } else {
                            filterCity.disabled = true;
                        }
                    }
                    filterAndRenderComplaints();
                });
            }
            
            if (searchBox) searchBox.addEventListener('input', filterAndRenderComplaints);
            if (filterCity) filterCity.addEventListener('change', filterAndRenderComplaints);
            if (filterUrgency) filterUrgency.addEventListener('change', filterAndRenderComplaints);
            if (filterCategory) filterCategory.addEventListener('change', filterAndRenderComplaints);
            if (filterStatus) filterStatus.addEventListener('change', filterAndRenderComplaints);
            
            const clearFiltersBtn = document.getElementById('clearFiltersBtn');
            if (clearFiltersBtn) {
                clearFiltersBtn.addEventListener('click', () => {
                    if (searchBox) searchBox.value = '';
                    if (filterDistrict) filterDistrict.value = '';
                    if (filterCity) {
                        filterCity.innerHTML = '<option value="">All Cities/Towns</option>';
                        filterCity.disabled = true;
                    }
                    if (filterUrgency) filterUrgency.value = '';
                    if (filterCategory) filterCategory.value = '';
                    if (filterStatus) filterStatus.value = '';
                    filterAndRenderComplaints();
                });
            }
            complaintsFiltersInitialized = true;
        }
        
    } catch (error) {
        console.error('Error loading complaints:', error);
    }
}

function filterAndRenderComplaints() {
    const searchBox = document.getElementById('searchBox');
    const filterDistrict = document.getElementById('filterDistrict');
    const filterCity = document.getElementById('filterCity');
    const filterUrgency = document.getElementById('filterUrgency');
    const filterCategory = document.getElementById('filterCategory');
    const filterStatus = document.getElementById('filterStatus');
    
    const searchTerm = searchBox ? searchBox.value.toLowerCase() : '';
    const district = filterDistrict ? filterDistrict.value : '';
    const city = filterCity ? filterCity.value : '';
    const urgency = filterUrgency ? filterUrgency.value : '';
    const category = filterCategory ? filterCategory.value : '';
    const status = filterStatus ? filterStatus.value : '';
    
    if (groupedMode) {
        const filtered = allGroupedComplaints.filter(g => g.total_complaints >= 2).filter(g => {
            const matchSearch = (g.district || '').toLowerCase().includes(searchTerm) || 
                                (g.city || '').toLowerCase().includes(searchTerm) ||
                                (g.location || '').toLowerCase().includes(searchTerm) ||
                                (g.predicted_category || '').toLowerCase().includes(searchTerm) ||
                                g.complaints.some(c => 
                                    c.ticket_id.toLowerCase().includes(searchTerm) || 
                                    c.citizen_name.toLowerCase().includes(searchTerm) || 
                                    (c.description || '').toLowerCase().includes(searchTerm)
                                );
            const matchDist = district ? g.district === district : true;
            const matchCity = city ? g.city === city : true;
            const matchCategory = category ? (g.predicted_category || '').includes(category) : true;
            const matchStatus = status ? g.status === status : true;
            const matchUrgency = urgency ? g.complaints.some(c => c.urgency_level === urgency) : true;
            return matchSearch && matchDist && matchCity && matchCategory && matchStatus && matchUrgency;
        });
        renderGroupedComplaints(filtered);
    } else {
        const filtered = allComplaints.filter(c => {
            const matchSearch = c.ticket_id.toLowerCase().includes(searchTerm) || 
                                c.citizen_name.toLowerCase().includes(searchTerm) ||
                                (c.description || '').toLowerCase().includes(searchTerm);
            const matchDist = district ? c.district === district : true;
            const matchCity = city ? c.city === city : true;
            const matchUrgency = urgency ? c.urgency_level === urgency : true;
            const matchCategory = category ? (c.predicted_category || '').includes(category) : true;
            const matchStatus = status ? c.status === status : true;
            return matchSearch && matchDist && matchCity && matchUrgency && matchCategory && matchStatus;
        });
        renderComplaints(filtered);
    }
}

function renderComplaints(data) {
    const tbody = document.getElementById('complaintsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center">No complaints found.</td></tr>';
        return;
    }
    
    data.forEach(c => {
        const tr = document.createElement('tr');
        
        const urgencyClass = c.urgency_level.toLowerCase();
        const statusClass = c.status.toLowerCase().replace(' ', '-');
        
        tr.innerHTML = `
            <td><strong>${c.ticket_id}</strong></td>
            <td>${c.citizen_name}</td>
            <td>${c.district || '-'}</td>
            <td>${c.city || '-'}</td>
            <td style="max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${c.specific_location || c.location || '-'}">${c.specific_location || c.location || '-'}</td>
            <td>${c.predicted_category}</td>
            <td><span class="badge ${urgencyClass}">${c.urgency_level}</span></td>
            <td><span class="badge ${statusClass}">${c.status}</span></td>
            <td>
                <button class="btn-outline" onclick="openActionModal('${c.ticket_id}')" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; border-radius:4px;">
                    View & Action
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderGroupedComplaints(data) {
    const tbody = document.getElementById('complaintsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center">No complaint groups found.</td></tr>';
        return;
    }
    
    data.forEach((g, index) => {
        const tr = document.createElement('tr');
        
        const avgScore = g.average_priority_score;
        let urgencyClass = 'low';
        if (avgScore >= 86) { urgencyClass = 'critical'; }
        else if (avgScore >= 61) { urgencyClass = 'high'; }
        else if (avgScore >= 31) { urgencyClass = 'medium'; }
        
        const statusClass = g.status.toLowerCase().replace(' ', '-');
        const groupKey = `${g.district}_${g.city}_${g.location}_${g.predicted_category}`.replace(/\s+/g, '_');
        
        tr.innerHTML = `
            <td><span class="badge group-badge"><i class="fas fa-layer-group"></i> Group</span></td>
            <td>
                <strong>${g.total_complaints} Citizen(s)</strong><br/>
                <span style="font-size:0.75rem; color:var(--text-secondary);">
                    ${g.complaints.map(c => c.citizen_name).slice(0, 2).join(', ')}${g.complaints.length > 2 ? '...' : ''}
                </span>
            </td>
            <td>${g.district || '-'}</td>
            <td>${g.city || '-'}</td>
            <td style="max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${g.location || '-'}">${g.location || '-'}</td>
            <td>${g.predicted_category}</td>
            <td>
                <span class="badge ${urgencyClass}">
                    Score: ${avgScore}
                </span>
            </td>
            <td><span class="badge ${statusClass}">${g.status}</span></td>
            <td>
                <button class="btn-primary" onclick="openGroupActionModal('${groupKey}')" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; border-radius:4px; font-weight:500;">
                    Group Action
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}


// --- Public Status ---
let publicComplaints = [];
let publicFiltersInitialized = false;

async function loadPublicComplaints() {
    try {
        const response = await fetch(`${API_BASE}/complaints`);
        publicComplaints = await response.json();
        
        const tbody = document.getElementById('publicComplaintsTableBody');
        if (!tbody) return;
        
        if (!publicFiltersInitialized) {
            setupPublicFilters();
            publicFiltersInitialized = true;
        }
        
        filterPublicData();
        
    } catch (error) {
        console.error('Error loading public complaints:', error);
    }
}

function setupPublicFilters() {
    const searchBox = document.getElementById('searchBox');
    const filterDistrict = document.getElementById('filterDistrict');
    const filterCity = document.getElementById('filterCity');
    const filterUrgency = document.getElementById('filterUrgency');
    const filterCategory = document.getElementById('filterCategory');
    const filterStatus = document.getElementById('filterStatus');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    if (filterDistrict) {
        filterDistrict.innerHTML = '<option value="">All Districts</option>';
        Object.keys(TAMIL_NADU_LOCATIONS).sort().forEach(dist => {
            const opt = document.createElement('option');
            opt.value = dist;
            opt.textContent = dist;
            filterDistrict.appendChild(opt);
        });
        
        filterDistrict.addEventListener('change', () => {
            const dist = filterDistrict.value;
            if (filterCity) {
                filterCity.innerHTML = '<option value="">All Cities/Towns</option>';
                if (dist && TAMIL_NADU_LOCATIONS[dist]) {
                    filterCity.disabled = false;
                    TAMIL_NADU_LOCATIONS[dist].forEach(city => {
                        const opt = document.createElement('option');
                        opt.value = city;
                        opt.textContent = city;
                        filterCity.appendChild(opt);
                    });
                } else {
                    filterCity.disabled = true;
                }
            }
            filterPublicData();
        });
    }
    
    if (searchBox) searchBox.addEventListener('input', filterPublicData);
    if (filterCity) filterCity.addEventListener('change', filterPublicData);
    if (filterUrgency) filterUrgency.addEventListener('change', filterPublicData);
    if (filterCategory) filterCategory.addEventListener('change', filterPublicData);
    if (filterStatus) filterStatus.addEventListener('change', filterPublicData);
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            if (searchBox) searchBox.value = '';
            if (filterDistrict) filterDistrict.value = '';
            if (filterCity) {
                filterCity.innerHTML = '<option value="">All Cities/Towns</option>';
                filterCity.disabled = true;
            }
            if (filterUrgency) filterUrgency.value = '';
            if (filterCategory) filterCategory.value = '';
            if (filterStatus) filterStatus.value = '';
            filterPublicData();
        });
    }
}

function filterPublicData() {
    const searchBox = document.getElementById('searchBox');
    const filterDistrict = document.getElementById('filterDistrict');
    const filterCity = document.getElementById('filterCity');
    const filterUrgency = document.getElementById('filterUrgency');
    const filterCategory = document.getElementById('filterCategory');
    const filterStatus = document.getElementById('filterStatus');
    
    const searchTerm = searchBox ? searchBox.value.toLowerCase() : '';
    const district = filterDistrict ? filterDistrict.value : '';
    const city = filterCity ? filterCity.value : '';
    const urgency = filterUrgency ? filterUrgency.value : '';
    const category = filterCategory ? filterCategory.value : '';
    const status = filterStatus ? filterStatus.value : '';
    
    const filtered = publicComplaints.filter(c => {
        const matchSearch = c.ticket_id.toLowerCase().includes(searchTerm) || 
                            c.citizen_name.toLowerCase().includes(searchTerm) ||
                            (c.description || '').toLowerCase().includes(searchTerm);
        const matchDist = district ? c.district === district : true;
        const matchCity = city ? c.city === city : true;
        const matchUrgency = urgency ? c.urgency_level === urgency : true;
        const matchCategory = category ? (c.predicted_category || '').includes(category) : true;
        const matchStatus = status ? c.status === status : true;
        return matchSearch && matchDist && matchCity && matchUrgency && matchCategory && matchStatus;
    });
    
    renderPublicComplaintsTable(filtered);
}

function renderPublicComplaintsTable(data) {
    const tbody = document.getElementById('publicComplaintsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center">No complaints found.</td></tr>';
        return;
    }
    
    data.forEach(c => {
        const tr = document.createElement('tr');
        
        const urgencyClass = c.urgency_level.toLowerCase();
        const statusClass = c.status.toLowerCase().replace(' ', '-');
        
        // Masking name slightly for privacy in public view
        const maskedName = c.citizen_name.substring(0, 2) + "***" + c.citizen_name.substring(c.citizen_name.length - 1);
        
        tr.innerHTML = `
            <td><strong>${c.ticket_id}</strong></td>
            <td>${maskedName}</td>
            <td>${c.district || '-'}</td>
            <td>${c.city || '-'}</td>
            <td>${c.predicted_category}</td>
            <td><span class="badge ${urgencyClass}">${c.urgency_level}</span></td>
            <td><span class="badge ${statusClass}">${c.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

let groupedQueueMode = false;
let allGroupedQueueComplaints = [];

async function loadPriorityQueue() {
    try {
        const url = groupedQueueMode ? `${API_BASE}/complaints/grouped` : `${API_BASE}/complaints`;
        const response = await fetch(url);
        const fetchedData = await response.json();
        
        const container = document.getElementById('priorityQueueContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (groupedQueueMode) {
            allGroupedQueueComplaints = fetchedData;
            // Filter out groups where status is Resolved, showing only groups with multiple complaints
            const pendingGroups = allGroupedQueueComplaints.filter(g => g.status !== 'Resolved' && g.total_complaints >= 2);
            
            if (pendingGroups.length === 0) {
                container.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--text-secondary);">No pending complaints in the queue.</p>';
                return;
            }
            
            pendingGroups.forEach(g => {
                const avgScore = g.average_priority_score;
                let urgencyClass = 'low';
                if (avgScore >= 86) { urgencyClass = 'critical'; }
                else if (avgScore >= 61) { urgencyClass = 'high'; }
                else if (avgScore >= 31) { urgencyClass = 'medium'; }
                
                const groupKey = `${g.district}_${g.city}_${g.location}_${g.predicted_category}`.replace(/\s+/g, '_');
                
                const card = document.createElement('div');
                card.className = `queue-card ${urgencyClass}`;
                
                const dates = g.complaints.map(c => new Date(c.created_at).getTime());
                const latestDate = new Date(Math.max(...dates)).toLocaleString();
                
                card.innerHTML = `
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span class="badge group-badge"><i class="fas fa-layer-group"></i> Group of ${g.total_complaints} Complaint(s)</span>
                            <span class="badge ${urgencyClass}">Average Score: ${avgScore}</span>
                        </div>
                        <h3 class="queue-card-category" style="margin-bottom: 0.6rem; font-size: 1.2rem; font-weight: 600; font-family: 'Outfit', sans-serif; color: #f5cf6e;">${g.predicted_category}</h3>
                        
                        <div class="location-trail" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                            <span class="badge info" style="background:#e0f2fe; color:#0369a1; font-size:0.75rem;"><i class="fas fa-map-marker-alt"></i> District: ${g.district || '-'}</span>
                            <span class="badge info" style="background:#f3e8ff; color:#6b21a8; font-size:0.75rem;"><i class="fas fa-city"></i> City/Town: ${g.city || '-'}</span>
                            <span class="badge info" style="background:#fef3c7; color:#92400e; font-size:0.75rem;"><i class="fas fa-road"></i> Specific: ${g.location || '-'}</span>
                        </div>
                        
                        <div style="margin-bottom: 0.6rem; border-left: 2px solid var(--border-color); padding-left: 1rem;">
                            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; font-style: italic;">
                                "${g.complaints[0].description}" ${g.total_complaints > 1 ? `and ${g.total_complaints - 1} other description(s)...` : ''}
                            </p>
                        </div>
                        
                        <div style="font-size: 0.85rem; color: var(--text-muted);">
                            Submissions from: ${g.complaints.map(c => c.citizen_name).join(', ')} | Latest: ${latestDate}
                        </div>
                    </div>
                    <div style="margin-left: 2rem; display:flex; align-items:center;">
                        <button class="btn-primary" onclick="openGroupActionModal('${groupKey}')" style="border-radius:4px; white-space:nowrap;">Group Action</button>
                    </div>
                `;
                container.appendChild(card);
            });
        } else {
            allComplaints = fetchedData;
            const queueData = allComplaints.filter(c => c.status !== 'Resolved');
            
            if (queueData.length === 0) {
                container.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--text-secondary);">No pending complaints in the queue.</p>';
                return;
            }
            
            queueData.forEach(c => {
                const urgencyClass = c.urgency_level.toLowerCase();
                const date = new Date(c.created_at).toLocaleString();
                
                const card = document.createElement('div');
                card.className = `queue-card ${urgencyClass}`;
                
                card.innerHTML = `
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <strong>${c.ticket_id}</strong>
                            <span class="badge ${urgencyClass}">Score: ${c.priority_score} - ${c.urgency_level}</span>
                        </div>
                        <h3 class="queue-card-category" style="margin-bottom: 0.6rem; font-size: 1.2rem; font-weight: 600; font-family: 'Outfit', sans-serif; color: #f5cf6e;">${c.predicted_category}</h3>
                        
                        <div class="location-trail" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                            <span class="badge info" style="background:#e0f2fe; color:#0369a1; font-size:0.75rem;"><i class="fas fa-map-marker-alt"></i> District: ${c.district || '-'}</span>
                            <span class="badge info" style="background:#f3e8ff; color:#6b21a8; font-size:0.75rem;"><i class="fas fa-city"></i> City/Town: ${c.city || '-'}</span>
                            <span class="badge info" style="background:#fef3c7; color:#92400e; font-size:0.75rem;"><i class="fas fa-road"></i> Specific: ${c.specific_location || c.location || '-'}</span>
                        </div>
                        
                        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0.6rem; line-height: 1.5;">${c.description}</p>
                        <div style="font-size: 0.85rem; color: var(--text-muted);">
                            Submitted by ${c.citizen_name} on ${date} | Status: ${c.status}
                        </div>
                    </div>
                    <div style="margin-left: 2rem; display:flex; align-items:center;">
                        <button class="btn-primary" onclick="openActionModal('${c.ticket_id}')" style="border-radius:4px; white-space:nowrap;">Take Action</button>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading queue:', error);
    }
}

// --- Action Modal & Details View ---
const modal = document.getElementById('actionModal');
const closeBtn = document.querySelector('.close-modal');
const actionForm = document.getElementById('actionForm');

let currentActionIsGroup = false;

function openActionModal(ticketId) {
    currentActionIsGroup = false;
    const complaint = allComplaints.find(c => c.ticket_id === ticketId);
    if (!complaint) return;

    document.getElementById('modalTicketId').textContent = ticketId;
    document.getElementById('actionTicketId').value = ticketId;
    document.getElementById('updateStatus').value = complaint.status;
    document.getElementById('actionNotes').value = '';
    
    // Inject detailed information into the modal
    const detailsContainer = document.getElementById('modalComplaintDetails');
    if (detailsContainer) {
        const evidenceMarkup = complaint.evidence_path ? 
            (complaint.evidence_path.endsWith('.pdf') ? 
                `<div style="margin-top:0.25rem;"><a href="${API_BASE.replace('/api', '')}${complaint.evidence_path}" target="_blank" class="btn-outline" style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.5rem 1rem; font-size:0.85rem; border-radius:6px; text-decoration:none;"><i class="fas fa-file-pdf" style="color:var(--danger); font-size:1.1rem;"></i> View Evidence PDF</a></div>` :
                `<div style="margin-top:0.25rem; text-align:center; width:100%;"><img src="${API_BASE.replace('/api', '')}${complaint.evidence_path}" style="max-width:100%; max-height:220px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer; box-shadow:var(--shadow-sm); transition:transform 0.2s;" onclick="window.open(this.src)" title="Click to view full image" alt="Evidence" class="evidence-thumbnail"></div>`
            ) : `<p style="color:var(--text-muted); font-size:0.9rem; font-style:italic; text-align:center; width:100%;"><i class="fas fa-info-circle"></i> No evidence uploaded</p>`;

        detailsContainer.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; background:rgba(5, 13, 26, 0.4); border:1px solid rgba(255,255,255,0.06); padding:1.25rem; border-radius:10px; border-left:4px solid var(--accent-color); margin-bottom:1.5rem; animation:popIn 0.3s ease;">
                <div>
                    <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--accent-light); margin-bottom:0.4rem; letter-spacing:0.05em; font-family:'Outfit';">Citizen Information</h4>
                    <p style="font-weight:600; color:var(--text-primary); font-size:1rem;"><i class="fas fa-user" style="color:var(--accent-color); margin-right:0.35rem;"></i> ${complaint.citizen_name}</p>
                    <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:0.25rem;"><i class="fas fa-phone" style="color:var(--text-secondary); margin-right:0.35rem;"></i> ${complaint.phone_number}</p>
                </div>
                <div>
                    <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--accent-light); margin-bottom:0.4rem; letter-spacing:0.05em; font-family:'Outfit';">AI Assessment</h4>
                    <p style="font-weight:600;"><span class="badge ${complaint.urgency_level.toLowerCase()}">Score ${complaint.priority_score} - ${complaint.urgency_level}</span></p>
                    <p style="color:var(--accent-color); font-weight:600; font-size:0.85rem; margin-top:0.35rem;"><i class="fas fa-tag" style="margin-right:0.35rem;"></i> ${complaint.predicted_category}</p>
                </div>
            </div>
            
            <div style="margin-bottom:1.5rem;">
                <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); margin-bottom:0.5rem; letter-spacing:0.05em; font-family:'Outfit';">Grievance Location Tree</h4>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                    <span class="badge info" style="background:rgba(56, 189, 248, 0.08); color:var(--info); border:1px solid rgba(56, 189, 248, 0.2); font-size:0.75rem; border-radius:6px;"><i class="fas fa-map-marker-alt"></i> District: ${complaint.district || '-'}</span>
                    <span class="badge info" style="background:rgba(124, 58, 237, 0.08); color:#a78bfa; border:1px solid rgba(124, 58, 237, 0.2); font-size:0.75rem; border-radius:6px;"><i class="fas fa-city"></i> City/Town: ${complaint.city || '-'}</span>
                    <span class="badge info" style="background:rgba(223, 161, 45, 0.08); color:var(--accent-color); border:1px solid rgba(223, 161, 45, 0.2); font-size:0.75rem; border-radius:6px;"><i class="fas fa-road"></i> Specific: ${complaint.specific_location || complaint.location || '-'}</span>
                </div>
            </div>

            <div style="margin-bottom:1.5rem; background:rgba(5, 13, 26, 0.2); border:1px solid var(--border-color); padding:1.25rem; border-radius:8px; max-height:180px; overflow-y:auto;">
                <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); margin-bottom:0.5rem; letter-spacing:0.05em; font-family:'Outfit';">Grievance Description</h4>
                <p style="color:var(--text-primary); font-size:0.92rem; white-space:pre-wrap; line-height:1.5;">${complaint.description}</p>
            </div>

            <div style="margin-bottom:1.5rem;">
                <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); margin-bottom:0.5rem; letter-spacing:0.05em; font-family:'Outfit';">Uploaded Evidence</h4>
                <div style="background:rgba(5, 13, 26, 0.15); border:1px dashed var(--border-color); padding:1.25rem; border-radius:8px; display:flex; align-items:center; justify-content:center; min-height:100px;">
                    ${evidenceMarkup}
                </div>
            </div>
            
            <hr style="border:0; border-top:1px solid var(--border-color); margin:1.5rem 0;" />
        `;
    }
    
    modal.classList.remove('hidden');
}

function openGroupActionModal(groupKey) {
    currentActionIsGroup = true;
    
    // Find in whichever active group list is populated
    const listToSearch = window.location.pathname.includes('queue.html') ? allGroupedQueueComplaints : allGroupedComplaints;
    const group = listToSearch.find(g => {
        const key = `${g.district}_${g.city}_${g.location}_${g.predicted_category}`.replace(/\s+/g, '_');
        return key === groupKey;
    });
    if (!group) return;

    document.getElementById('modalTicketId').innerHTML = `<span class="badge group-badge"><i class="fas fa-layer-group"></i> Group of ${group.total_complaints} Complaints</span>`;
    
    const ticketIds = group.complaints.map(c => c.ticket_id).join(',');
    document.getElementById('actionTicketId').value = ticketIds;
    document.getElementById('updateStatus').value = group.status;
    document.getElementById('actionNotes').value = '';
    
    // Inject detailed information into the modal
    const detailsContainer = document.getElementById('modalComplaintDetails');
    if (detailsContainer) {
        let complaintsHtml = '';
        group.complaints.forEach(c => {
            const date = new Date(c.created_at).toLocaleString();
            const evidenceMarkup = c.evidence_path ? 
                (c.evidence_path.endsWith('.pdf') ? 
                    `<div class="modal-evidence-section" style="margin-top:0.5rem;"><a href="${API_BASE.replace('/api', '')}${c.evidence_path}" target="_blank" class="btn-outline" style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px; text-decoration:none;"><i class="fas fa-file-pdf" style="color:var(--danger);"></i> View PDF</a></div>` :
                    `<div class="modal-evidence-section" style="display:flex; align-items:center; gap:10px; margin-top:0.5rem;"><strong>Evidence:</strong> <img src="${API_BASE.replace('/api', '')}${c.evidence_path}" style="max-height:80px; border-radius:4px; border:1px solid var(--border-color); cursor:pointer;" onclick="window.open(this.src)"></div>`
                ) : '';

            complaintsHtml += `
                <div class="modal-complaint-item" style="margin-bottom:0.75rem;">
                    <div class="modal-complaint-header">
                        <strong style="color:var(--accent-light);">${c.ticket_id}</strong>
                        <span class="badge ${c.urgency_level.toLowerCase()}" style="font-size:0.7rem; padding:0.15rem 0.5rem;">Score: ${c.priority_score} - ${c.urgency_level}</span>
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.4rem;">
                        Submitted by <strong>${c.citizen_name}</strong> (${c.phone_number}) on ${date} | Status: <span class="badge ${c.status.toLowerCase().replace(' ', '-')}" style="font-size:0.7rem; padding:0.15rem 0.5rem;">${c.status}</span>
                    </div>
                    <div class="modal-complaint-body">${c.description}</div>
                    ${evidenceMarkup}
                </div>
            `;
        });

        detailsContainer.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr; gap:1.25rem; background:rgba(5, 13, 26, 0.4); border:1px solid rgba(255,255,255,0.06); padding:1.25rem; border-radius:10px; border-left:4px solid var(--accent-color); margin-bottom:1.5rem;">
                <div>
                    <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--accent-light); margin-bottom:0.4rem; letter-spacing:0.05em; font-family:'Outfit';">Group Information</h4>
                    <p style="font-weight:600; color:var(--text-primary); font-size:0.95rem;"><i class="fas fa-map-marker-alt" style="color:var(--accent-color); margin-right:0.35rem;"></i> ${group.location || '-'}, ${group.city || '-'}, ${group.district || '-'} Dist</p>
                    <p style="color:var(--accent-color); font-weight:600; font-size:0.85rem; margin-top:0.35rem;"><i class="fas fa-tag" style="margin-right:0.35rem;"></i> Department: ${group.predicted_category}</p>
                    <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:0.35rem;"><i class="fas fa-calculator" style="margin-right:0.35rem;"></i> Average Priority Score: <strong style="color:var(--text-primary);">${group.average_priority_score}</strong></p>
                </div>
            </div>
            
            <div style="margin-bottom:1.5rem;">
                <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); margin-bottom:0.5rem; letter-spacing:0.05em; font-family:'Outfit';">Grievances in Group (${group.total_complaints})</h4>
                <div class="modal-complaints-list">
                    ${complaintsHtml}
                </div>
            </div>
            <hr style="border:0; border-top:1px solid var(--border-color); margin:1.5rem 0;" />
        `;
    }
    
    modal.classList.remove('hidden');
}


if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

if (actionForm) {
    actionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const ticketIdVal = document.getElementById('actionTicketId').value;
        const formData = new FormData(actionForm);
        formData.append('admin_id', sessionStorage.getItem('admin_id'));
        
        let url;
        if (currentActionIsGroup) {
            url = `${API_BASE}/complaints/grouped/action`;
            formData.append('ticket_ids', ticketIdVal);
        } else {
            url = `${API_BASE}/complaints/${ticketIdVal}/action`;
        }
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                modal.classList.add('hidden');
                // Reload current view
                if (window.location.pathname.includes('complaints.html')) {
                    loadComplaints();
                } else if (window.location.pathname.includes('queue.html')) {
                    loadPriorityQueue();
                }
            } else {
                const errData = await response.json();
                alert('Failed to update status: ' + (errData.detail || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    });
}

window.openActionModal = openActionModal;
window.openGroupActionModal = openGroupActionModal;
window.toggleGroupedMode = function(isGrouped) {
    groupedMode = isGrouped;
    loadComplaints();
};
window.toggleGroupedQueueMode = function(isGrouped) {
    groupedQueueMode = isGrouped;
    loadPriorityQueue();
};


function exportToCSV() {
    if(allComplaints.length === 0) return;
    
    const headers = ['Ticket ID', 'Citizen Name', 'Phone', 'District', 'City/Town', 'Specific Location', 'Category', 'Urgency', 'Priority Score', 'Status', 'Date'];
    
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    allComplaints.forEach(c => {
        const row = [
            c.ticket_id,
            `"${c.citizen_name}"`,
            c.phone_number,
            `"${c.district || ''}"`,
            `"${c.city || ''}"`,
            `"${c.specific_location || c.location || ''}"`,
            `"${c.predicted_category || ''}"`,
            c.urgency_level,
            c.priority_score,
            c.status,
            `"${new Date(c.created_at).toLocaleString()}"`
        ];
        csvRows.push(row.join(','));
    });
    
    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'complaints_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
