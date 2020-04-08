const init = () => {
    "use strict";
    document.body.style.visibility = 'visible';
    
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
                title: "Project 1", 
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam natus libero vitae quam aperiam veniam error, nisi consectetur similique possimus itaque ad id quas. Molestiae sit eum ducimus sunt? Facere!",
                img: "image_1.png",
                code: "https://github.com",
                url: "https://example.com"
            },
            { 
                title: "Project 2", 
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam natus libero vitae quam aperiam veniam error, nisi consectetur similique possimus itaque ad id quas. Molestiae sit eum ducimus sunt? Facere!",
                img: "image_2.png",
                code: "https://github.com",
                url: "https://example.com"
            },
            { 
                title: "Project 3", 
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam natus libero vitae quam aperiam veniam error, nisi consectetur similique possimus itaque ad id quas. Molestiae sit eum ducimus sunt? Facere!",
                img: "image_3.png",
                code: "https://github.com",
                url: "https://example.com"
            },
            { 
                title: "Project 4", 
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam natus libero vitae quam aperiam veniam error, nisi consectetur similique possimus itaque ad id quas. Molestiae sit eum ducimus sunt? Facere!",
                img: "image_4.png",
                code: "https://github.com",
                url: "https://example.com"
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
                                        #233342 url(/assets/slides/${item.img}) no-repeat center 100%`;
            proj_title.innerText = item.title;
            proj_code.innerText = "Github Code";
            proj_code.href = item.code;
            proj_code.target = "_blank";
            proj_text.innerText = item.text;

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
        nav_dots.style.left = `calc(50% - ${proj_len*1.5}rem)`;
        
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
        const STAR_COUNT = 50;

        class Star {
            constructor(){
                this.recalculate();
                this.radius = ~~(Math.random() * (3 - 1 + 1)) + 1; // random() * (max - min + 1) + min = [min...max];
                this.yIncrease = 0;
                this.ySpeed = 1 - 2 * this.radius / 10 // Bigger ones should go slower
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
            ctx.fillStyle = "#999";
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