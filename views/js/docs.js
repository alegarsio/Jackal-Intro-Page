 document.addEventListener("DOMContentLoaded", () => {
            const sections = document.querySelectorAll("main section[id]");
            const navLinks = document.querySelectorAll("aside nav ul li a");

            const observerOptions = {
                root: null,
                rootMargin: "-20% 0px -70% 0px",
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            link.classList.remove('bg-black', 'text-white', 'font-medium');
                            link.classList.add('text-neutral-600', 'hover:bg-neutral-100');
                        });

                        const activeLink = document.querySelector(`aside nav ul li a[href="#${entry.target.id}"]`);
                        if (activeLink) {
                            activeLink.classList.add('bg-black', 'text-white', 'font-medium');
                            activeLink.classList.remove('text-neutral-600', 'hover:bg-neutral-100');
                        }
                    }
                });
            }, observerOptions);

            sections.forEach((section) => {
                observer.observe(section);
            });
        });