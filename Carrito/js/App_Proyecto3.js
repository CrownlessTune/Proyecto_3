let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.getElementById('vaciar-carrito');
const addCartBtns = document.querySelectorAll('.agregar-carrito');

const initializeCourseCards = () => {
    const courseCards = document.querySelectorAll('.card');

    courseCards.forEach(card => {
        const courseId = card.getAttribute('data-id');
        const courseName = card.querySelector('h4').textContent;
        const coursePrice = parseFloat(card.querySelector('.precio').textContent.split(' ')[0]);
        const courseImage = card.querySelector('.imagen-curso').src;

        const viewCourseBtn = createViewCourseButton(courseId, courseName, coursePrice, courseImage);
        card.appendChild(viewCourseBtn);
    });
};

const createViewCourseButton = (courseId, courseName, coursePrice, courseImage) => {
    const btn = document.createElement('button');
    btn.textContent = 'Ver curso';
    btn.classList.add('ver-curso');
    Object.assign(btn.style, {
        backgroundColor: '#33c3f0',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'block',
        margin: '10px auto',
        textAlign: 'center'
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showCourseDetails({ id: parseInt(courseId), name: courseName, price: coursePrice, image: courseImage });
    });

    return btn;
};

const addCourseToCart = (course) => {
    const existingCourse = cart.find(item => item.id === course.id);
    if (existingCourse) {
        existingCourse.quantity++;
    } else {
        cart.push({ ...course, quantity: 1 });
    }
    updateCart();
};

const displayCart = () => {
    cartList.innerHTML = '';
    cart.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${course.image}" width="50"></td>
            <td>${course.name}</td>
            <td>${course.price}€</td>
            <td>${course.quantity}</td>
            <td><a href="#" class="remove-course" data-id="${course.id}">X</a></td>
        `;
        cartList.appendChild(row);
    });
    addRemoveEventListeners();
};

const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
};

const addRemoveEventListeners = () => {
    const removeCourseBtns = document.querySelectorAll('.remove-course');
    removeCourseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const row = btn.closest('tr');
            row.style.transition = "opacity 0.5s ease";
            row.style.opacity = "0"; 
            
            setTimeout(() => {
                const courseId = parseInt(btn.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== courseId);
                updateCart();
            }, 500);
        });
    });
};

const showCourseDetails = (course) => {
    const detailsContainer = document.createElement('div');
    detailsContainer.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; z-index: 1000;">
            <h2>${course.name}</h2>
            <img src="${course.image}" style="width: 200px; height: auto;">
            <p>Precio: ${course.price}€</p>
            <button id="close-details">Cerrar</button>
        </div>
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999;"></div>
    `;
    
    document.body.appendChild(detailsContainer);
    
    document.getElementById('close-details').addEventListener('click', () => {
        document.body.removeChild(detailsContainer);
    });
};

const clearCart = () => {
    cartList.style.transition = "transform 0.5s ease";
    cartList.style.transform = "scale(0)"; 

    setTimeout(() => {
        cart = [];
        updateCart();
        cartList.style.transform = "scale(1)";
    }, 500);
};

const initializeEventListeners = () => {
    clearCartBtn.addEventListener('click', clearCart);
    
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const courseCard = btn.closest('.card');
            const courseId = btn.getAttribute('data-id');
            const courseName = courseCard.querySelector('h4').textContent;
            const coursePrice = parseFloat(courseCard.querySelector('.precio').textContent.split(' ')[0]);
            const courseImage = courseCard.querySelector('.imagen-curso').src;

            addCourseToCart({ id: parseInt(courseId), name: courseName, price: coursePrice, image: courseImage });
        });
    });
};

initializeCourseCards();
initializeEventListeners();
displayCart();
