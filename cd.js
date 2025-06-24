let currentIndex = 0;
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.querySelector('.dots-container');
let dots;

// tự động điều chỉnh số lượng dots
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
    dots = document.querySelectorAll('.dot');
}

// Hàm cập nhật trạng thái dots
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Hàm chuyển slide
function showSlide(index) {
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// Điều hướng next/prev
function showNextSlide() {
    showSlide(currentIndex + 1);
}

function showPrevSlide() {
    showSlide(currentIndex - 1);
}


nextBtn.addEventListener('click', showNextSlide);
prevBtn.addEventListener('click', showPrevSlide);

// Sự kiện cho dots
function addDotListeners() {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
}

// Tự động chuyển slide
setInterval(showNextSlide, 3000);


createDots();
addDotListeners();
//tìm ngoài trang
document.getElementById('searchBtn').addEventListener('click', function () {
    let keyword = document.getElementById('searchInput').value.trim();
    let searchExternal = document.getElementById('searchExternal').checked;

    if (keyword === "") {
        alert("Vui lòng nhập từ khóa!");
        return;
    }

    if (searchExternal) {

        window.location.href = `https://www.nhaccuatui.com/tim-kiem?q=${encodeURIComponent(keyword)}`;
    } else {

        searchLocal(keyword);
    }
});
//hiện lên khi không nhập từ khóa
document.getElementById('searchBtn').addEventListener('click', function () {
    let keyword = document.getElementById('searchInput').value.trim();
    let searchExternal = document.getElementById('searchExternal').checked;

    if (keyword === "") {
        alert("Vui lòng nhập từ khóa!");
        return;
    }

    // Điều hướng đến trang search.html và truyền từ khóa qua URL
    window.location.href = `search.html?q=${encodeURIComponent(keyword)}&external=${searchExternal}`;
});

