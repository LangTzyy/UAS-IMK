// Mobile Menu Toggle
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            
            const btn = document.querySelector('.mobile-menu-btn');
            if (navLinks.classList.contains('active')) {
                btn.setAttribute('aria-expanded', 'true');
            } else {
                btn.setAttribute('aria-expanded', 'false');
            }
        }

        // Filter Programs by Faculty
        function filterPrograms(faculty) {
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
            
            // Filter programs
            const programs = document.querySelectorAll('.program-card');
            programs.forEach(program => {
                if (faculty === 'all' || program.getAttribute('data-faculty') === faculty) {
                    program.style.display = 'block';
                } else {
                    program.style.display = 'none';
                }
            });
        }

        // Gallery Modal
        function openModal(imageSrc, caption) {
            const modal = document.getElementById('galleryModal');
            const modalImg = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            
            modal.style.display = 'flex';
            modalImg.src = imageSrc;
            modalCaption.textContent = caption;
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('galleryModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Initialize gallery items
        document.addEventListener('DOMContentLoaded', () => {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const imgSrc = item.querySelector('img').src;
                    const caption = item.querySelector('.gallery-caption').textContent;
                    openModal(imgSrc, caption);
                });
            });
        });

        // Accessibility Features
        function toggleHighContrast() {
            document.body.classList.toggle('high-contrast');
            const btn = document.getElementById('highContrastBtn');
            if (document.body.classList.contains('high-contrast')) {
                btn.innerHTML = '<i class="fas fa-adjust"></i><span>Normal Contrast</span>';
                localStorage.setItem('highContrast', 'enabled');
            } else {
                btn.innerHTML = '<i class="fas fa-adjust"></i><span>Kontras Tinggi</span>';
                localStorage.setItem('highContrast', 'disabled');
            }
        }

        function toggleLargeText() {
            document.body.classList.toggle('large-text');
            const btn = document.getElementById('largeTextBtn');
            if (document.body.classList.contains('large-text')) {
                btn.innerHTML = '<i class="fas fa-text-height"></i><span>Teks Normal</span>';
                localStorage.setItem('largeText', 'enabled');
            } else {
                btn.innerHTML = '<i class="fas fa-text-height"></i><span>Teks Besar</span>';
                localStorage.setItem('largeText', 'disabled');
            }
        }

        function enableVoiceControl() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tidak Didukung',
                    text: 'Browser kamu belum mendukung fitur kontrol suara.',
                });
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'id-ID';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            Swal.fire({
                icon: 'info',
                title: 'Kontrol Suara Diaktifkan',
                html: `
                    Ucapkan:<br>
                    - <strong>Beranda</strong><br>
                    - <strong>Galeri</strong><br>
                    - <strong>Fakultas</strong><br>
                    - <strong>Kontak</strong><br>
                    - <strong>Pendaftaran</strong>
                `,
                confirmButtonText: 'Oke',
            });

            recognition.start();

            recognition.onresult = function (event) {
                const command = event.results[0][0].transcript.toLowerCase();
                console.log("Perintah suara:", command);

                if (command.includes("beranda")) {
                    document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
                } else if (command.includes("galeri")) {
                    document.querySelector("#gallery").scrollIntoView({ behavior: "smooth" });
                } else if (command.includes("fakultas")) {
                    document.querySelector("#faculties").scrollIntoView({ behavior: "smooth" });
                } else if (command.includes("kontak")) {
                    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
                } else if (command.includes("pendaftaran")) {
                    document.querySelector("#registration").scrollIntoView({ behavior: "smooth" });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Perintah Tidak Dikenali',
                        text: 'Perintah yang Anda ucapkan belum dikenali sistem.',
                    });
                }
            };

            recognition.onerror = function (event) {
                Swal.fire({
                    icon: 'error',
                    title: 'Kesalahan Pengucapan',
                    text: event.error,
                });
            };
        }

        function resetAccessibility() {
            document.body.classList.remove('high-contrast', 'large-text');
            localStorage.removeItem('highContrast');
            localStorage.removeItem('largeText');
            localStorage.removeItem('voiceControl');
            document.getElementById('highContrastBtn').innerHTML = '<i class="fas fa-adjust"></i><span>Kontras Tinggi</span>';
            document.getElementById('largeTextBtn').innerHTML = '<i class="fas fa-text-height"></i><span>Teks Besar</span>';
        }

        // Form Submissions
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.');
            this.reset();
        });

        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Pendaftaran berhasil dikirim! Tim kami akan menghubungi Anda untuk proses selanjutnya.');
            this.reset();
        });

        // Check for saved accessibility preferences
        window.addEventListener('DOMContentLoaded', () => {
            if (localStorage.getItem('highContrast') === 'enabled') {
                document.body.classList.add('high-contrast');
                document.getElementById('highContrastBtn').innerHTML = '<i class="fas fa-adjust"></i><span>Normal Contrast</span>';
            }
            
            if (localStorage.getItem('largeText') === 'enabled') {
                document.body.classList.add('large-text');
                document.getElementById('largeTextBtn').innerHTML = '<i class="fas fa-text-height"></i><span>Teks Normal</span>';
            }
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        document.querySelector('.nav-links').classList.remove('active');
                    }
                });
            });
            
            // Show skip link when tabbed to
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    document.querySelector('.skip-link').style.top = '0';
                }
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === document.getElementById('galleryModal')) {
                closeModal();
            }
        });