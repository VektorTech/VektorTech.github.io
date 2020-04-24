const init = () => {
    "use strict";

    /*FOUC fix and hide loader*/
    document.body.className = 'loaded';
    document.getElementsByClassName('spinner-wrapper')[0].style.display = 'none';

    /** Contact Button */
    {
        document.body.onscroll = e => {
            const clientHeight = document.documentElement.clientHeight;
            { //computes button fill based on scroll top value
                const height = document.body.scrollHeight - clientHeight;
                const factor = height / 18; //18 is the width of the button
                const scrollPosY = Number((pageYOffset / factor - 18)*10).toFixed(2) + "px";

                const contact_btn = document.getElementById('contact_btn');
                const contact_btn_shadow = getComputedStyle(contact_btn)['boxShadow'];

                contact_btn.style.boxShadow = contact_btn_shadow.replace(/[-]?\d+(?:[.]\d+)?px/, scrollPosY);
            }

            {
                const scene = document.getElementsByClassName('scene3d')[0];
                let offset = 0;
                let pos = getComputedStyle(document.getElementsByClassName('container3d')[0])['position']=="absolute";

                if(pos && (pageYOffset - clientHeight > 0) 
                        && pageYOffset < clientHeight * 2.5 ){
                    if(clientHeight < document.documentElement.clientWidth){
                        offset = (pageYOffset - clientHeight) * 2;
                    } else {
                        offset = pageYOffset - clientHeight;
                    }
                    scene.style.transform = `translateZ(${offset}px)`;
                }
                else if(!pos && pageYOffset < clientHeight * 2.5){
                    offset = pageYOffset;
                    scene.style.transform = `translateZ(${offset}px)`;
                }
            }
        };
    }

    /** Burger Menu - Navigation */
    {
        window.menu_click_handler = (i) => {
            if(i !== undefined && i > 0){
                if(getComputedStyle(document.getElementById('cover'))['zIndex'] === '-1'){
                    i+=2;
                } else { i++; }
                scrollTo(0, window.innerHeight*i);
            } else if(i !== undefined ) {
                scrollTo(0, 0);
            }

            ['nav_content', 'bar', 'nav_list'].forEach(name => {
                document.getElementsByClassName(name)[0]
                .classList.toggle('active');
            });
        }

        document.getElementById('menu_btn')
                .addEventListener('click', e => menu_click_handler());
        
        [...document.getElementsByClassName('nav_item')]
                .map( (item, i) => {
                    item.addEventListener('click', () => {
                        menu_click_handler(i);
                    });
                    item.addEventListener('keydown', e => {
                        if(e.code == "Enter"){
                            menu_click_handler(i);
                        }
                    });
                });
    }

    /** Tiles */
    {
        const tiles = document.getElementById('tiles');
        skill_icons.map( (item, i) => {
            const prop = document.createElement('div');
            prop.id = item[0];
            prop.style.background = `url(${item[1]}) no-repeat center`;
            prop.style.backgroundSize = 'contain';

            const title = document.createElement('p');
            title.innerText = item[0].toUpperCase();
            prop.appendChild(title);

            tiles.appendChild(prop);
        });

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting){
                const target = entries[0].target;
                [...target.children].map(elem => elem.className = 'trigger');
                observer.unobserve(target);
            }
        }, { root: null, rootMargin: '0px', threshold: .9 });
        observer.observe(tiles);
    }

    /** SlideShow for projects */
    {
        const _projects = [
            { 
                title: "this.myPortfolio", 
                text: `Tech: HTML5, CSS3, Sass, JavaScript<br>
                Description: A developer portfolio for marketing my skills, hosted on Github Pages.<br>
                Features: CSS 3D and Animation, JS Canvas, HTML Form validation
                `,
                img: "portfolio.jpg",
                code: "https://github.com/VektorTech/VektorTech.github.io",
                url: "/"
            },
            { 
                title: "Gimmi Burga - WIP", 
                text: `Tech: HTML5, CSS3, React[router, hooks, Spring, helmet], Redux[sagas], Mongoose<br>
                Description: A fast food delivery app.<br>
                Specifications: Uses redux-persist for persisting data on the front end and reselect to memoize redux selectors,<br>
                CORS enabled, Express API, Passport JS for Authentication`,
                img: "burga.jpg",
                code: "https://github.com/VektorTech/gimmi-burga",
                url: "https://github.com/VektorTech/gimmi-burga"
            },
            { 
                title: "Job Haven - WIP", 
                text: `Tech: HTML5, CSS3, React, NextJS, Sequelize<br>
                Description: A server side rendered job postings website.<br>
                Specifications: Uses Local Storage temporarily storing data, REST Node js API, Styled Components<br>
                Features: Uses JWT Auth`,
                img: "jobboard.jpg",
                code: "https://github.com/VektorTech/job-board",
                url: "https://github.com/VektorTech/job-board"
            },
            { 
                title: "Design Dashboard", 
                text: `Tech: HTML5, Sass[flexbox, grids], BEM, Webpack<br>
                Description: Created a dashboard UI from a design.`,
                img: "dashboard.jpg",
                code: "https://github.com/VektorTech/product-design-dashboard",
                url: "https://github.com/VektorTech/product-design-dashboard"
            }
        ];
        const proj_len = _projects.length;

        const link = document.getElementById('js-proj_link');
        
        const projects = _projects.map((item, i) => {
            const proj_bg = document.createElement('div');
            const proj_descr = document.createElement('div');
            const proj_title = document.createElement('h2');
            const proj_code = document.createElement('a');
            const proj_text = document.createElement('p');
    
            proj_bg.id = 'proj_bg';
            proj_descr.id = 'proj_descr';
            proj_title.id = 'proj_title';
            proj_code.id = 'proj_code';
            proj_text.id = 'proj_text';

            proj_title.className = 'heading';
            proj_text.className = 'sub_text';
    
            proj_descr.appendChild(proj_title);
            proj_descr.appendChild(proj_code);
            proj_descr.appendChild(proj_text);
            proj_bg.appendChild(proj_descr);

            proj_bg.style.background = `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0)), 
                                        #233342 url(/slides/${item.img}) no-repeat center 100%`;
            proj_title.innerText = item.title;
            proj_code.innerText = "Github Code";
            proj_code.href = item.code;
            proj_code.target = "_blank";
            proj_text.innerHTML = item.text;

            link.appendChild(proj_bg);

            return proj_bg;
        });

        let curr_pos = 0;

        const setItem = (pos) => {
            projects.forEach((item, i) => {
                if(pos == i){
                    item.className = 'active';
                } else item.className = '';
            });

            link.href = _projects[pos].url;
        }

        const next = i => {
            if(i == 0){
                curr_pos = curr_pos == 0 ? proj_len-1 : curr_pos-1;
                dots[curr_pos].checked = true;
            } else {
                curr_pos = curr_pos == proj_len-1 ? 0 : curr_pos+1;
                dots[curr_pos].checked = true;
            }
            setItem(curr_pos);
        }

        document.getElementById('projects').addEventListener('keydown', e => {
            if(e.code == "ArrowLeft"){
                next(0);
            } else if(e.code == "ArrowRight") next(1);
        });
        
        const nav_dots = document.getElementsByClassName('nav_dots')[0];
        nav_dots.style.left = `calc(50% - ${proj_len*1.25}rem)`;
        
        const dots = [...Array(proj_len)].map((_, i) => {
            const dot = document.createElement('input');

            dot.type = 'radio';
            dot.name = 'dot';
            dot.className = 'dot';

            dot.addEventListener('click', () => {
                curr_pos = i;
                setItem(curr_pos);
            });

            nav_dots.appendChild(dot);
            return dot;
        });
        
        [...document.getElementsByClassName('proj-arrow')].forEach( (arrow, i) => {
            arrow.addEventListener('click', (e) => next(i));
        });

        dots[curr_pos].checked = true;
        setItem(curr_pos);
    }

    /** Background canvas animation */
    {
        const canvas = document.getElementsByTagName('canvas')[0];
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();

        const ctx = canvas.getContext('2d');
        const STAR_COUNT = 40;

        class Star {
            constructor(){
                this.recalculate();
                this.radius = ~~(Math.random() * (2 - 1 + 1)) + 1; // random() * (max - min + 1) + min = [min...max];
                this.yIncrease = 0;
                this.ySpeed = 1 - 2 * this.radius / 7 // Bigger ones should go slower
            }

            rise() {
                this.yIncrease++;
            }

            recalculate() {
                this.x = ~~(Math.random() * canvas.width + 1);
                this.y = ~~(Math.random() * canvas.height + 1) + canvas.height; 
            }

            resetY(){
                if(this.y - this.yIncrease * this.ySpeed <= 0){
                    this.yIncrease = 0;
                }
            }
        }
        
        const stars = [...Array(STAR_COUNT)].map(() => new Star());

        const draw = ({x, y, radius, yIncrease, ySpeed}) => {
            ctx.beginPath();// canvas won't clear without this
            ctx.arc(x, y - yIncrease * ySpeed, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#888";
            ctx.fill();
        };

        const update = () => {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            
            stars.forEach(draw);
            stars.forEach(_=>_.resetY());
            stars.forEach(_=>_.rise());
            
            requestAnimationFrame(update);
        };

        update();

        window.addEventListener('resize', () => {
            resizeCanvas();
            stars.forEach(_=>_.recalculate());
        }, false);
    }
};

window.addEventListener('load', init);