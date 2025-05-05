document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Modal Functionality
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    
    // Open Login Modal
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Open Register Modal
    signupBtn.addEventListener('click', function() {
        registerModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close Modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Switch between Login and Register
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal || e.target === registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Grade Level Tabs
    const gradeTabs = document.querySelectorAll('.grade-tab');
    const coursesGrid = document.querySelector('.courses-grid');
    
    // Sample courses data
    const coursesData = {
        elementary: [
            { title: 'Basic Math', description: 'Introduction to numbers and basic operations', price: 'Free' },
            { title: 'Science for Kids', description: 'Fun science experiments and concepts', price: '$19.99' },
            { title: 'Reading Fundamentals', description: 'Developing early reading skills', price: 'Free' }
        ],
        middle: [
            { title: 'Pre-Algebra', description: 'Foundations for algebraic thinking', price: '$29.99' },
            { title: 'Life Science', description: 'Exploring biology and ecosystems', price: '$24.99' },
            { title: 'Creative Writing', description: 'Developing writing skills', price: '$19.99' }
        ],
        high: [
            { title: 'Algebra I', description: 'Linear equations and functions', price: '$39.99' },
            { title: 'Chemistry', description: 'Atoms, molecules, and reactions', price: '$34.99' },
            { title: 'World History', description: 'Survey of world civilizations', price: '$29.99' }
        ],
        college: [
            { title: 'Calculus I', description: 'Limits, derivatives, and integrals', price: '$49.99' },
            { title: 'Computer Science 101', description: 'Introduction to programming', price: '$44.99' },
            { title: 'Psychology', description: 'Introduction to human behavior', price: '$39.99' }
        ],
        professional: [
            { title: 'Web Development Bootcamp', description: 'Full-stack web development', price: '$199.99' },
            { title: 'Data Science', description: 'Python, statistics, and machine learning', price: '$179.99' },
            { title: 'Digital Marketing', description: 'SEO, social media, and analytics', price: '$149.99' }
        ]
    };
    
    // Function to load courses
    function loadCourses(grade) {
        coursesGrid.innerHTML = '';
        coursesData[grade].forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <img src="images/courses/${grade}-${course.title.toLowerCase().replace(/\s+/g, '-')}.jpg" alt="${course.title}">
                <div class="course-card-content">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span class="course-price">${course.price}</span>
                        <span class="course-rating"><i class="fas fa-star"></i> 4.8</span>
                    </div>
                </div>
            `;
            coursesGrid.appendChild(courseCard);
        });
    }
    
    // Set default tab
    gradeTabs[0].classList.add('active');
    loadCourses('elementary');
    
    // Tab switching
    gradeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const grade = this.getAttribute('data-grade');
            
            // Update active tab
            gradeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Load courses
            loadCourses(grade);
        });
    });

    // Video Player Controls
    const video = document.getElementById('demoVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    // Play/Pause
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Mute/Unmute
    muteBtn.addEventListener('click', function() {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });
    
    // Volume Control
    volumeSlider.addEventListener('input', function() {
        video.volume = this.value;
        video.muted = this.value == 0;
        muteBtn.innerHTML = this.value == 0 ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });
    
    // Update Time
    video.addEventListener('timeupdate', function() {
        currentTimeEl.textContent = formatTime(video.currentTime);
        durationEl.textContent = formatTime(video.duration);
    });
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
    
    // Form Submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real app, you would send this to your backend
        console.log('Login attempt:', { email, password });
        
        // For demo, just close the modal
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Show welcome message (in a real app, redirect to dashboard)
        alert('Welcome back! You are now logged in.');
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const interest = document.getElementById('registerInterest').value;
        const grade = document.getElementById('registerGrade').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword || !interest || !grade) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        // In a real app, you would send this to your backend
        console.log('Registration:', { name, email, password, interest, grade });
        
        // For demo, just close the modal
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Show success message
        alert(`Welcome ${name}! Your account has been created. You can now start learning.`);
    });
});