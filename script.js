const inputSearch = document.getElementById('search-input');
const inputSearchBtn = document.getElementById('search-btn');
const tableBody = document.getElementById('book-list-tbody');
const sortSelect = document.getElementById('sort-select');
const bookPriceInput = document.getElementById('bookprice');
const searchInput = document.getElementById('search-input');

let bookList = [];
let BOOK_NO = 1;

// 책 추가기능
function registerBook() {
  const bookCategory = document.getElementById('category').value;
  const bookName = document.getElementById('bookname').value;
  const bookPrice = document.getElementById('bookprice').value;

  // 중복 검사
  // some: 조건을 만족하면 true를 반환.
  const isExist = bookList.some(book => book.category === bookCategory && book.name === bookName);

  if (bookCategory && bookName && bookPrice) {
    if (isExist) { // 존재하면 추가 거부
      alert('이미 등록된 도서입니다.');
    } else {
      bookList.push({ BOOK_NO: BOOK_NO, category: bookCategory, name: bookName, price: parseFloat(bookPrice) });
      let row = `
        <tr>
          <td>${BOOK_NO++}</td>
          <td>${bookCategory}</td>
          <td>${bookName}</td>  
          <td>${bookPrice}</td>
          <td><button onclick="removeBook(${bookList.length - 1})">삭제</button></td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    }
  } else {
    let errors = [];
    if (bookCategory === "") errors.push("카테고리가 선택되지 않았습니다.");
    if (bookName === "") errors.push("책 이름이 빈칸입니다.");
    if (bookPrice === "") errors.push("책 가격이 빈칸입니다.")

    alert(errors.join("\n"));
  }
}

// 책 목록 출력기능
function printBookList() {

  tableBody.innerHTML = '';
  bookList.forEach((book) => {
    let row = `
      <tr>
        <td>${book.BOOK_NO}</td>
        <td>${book.category}</td>
        <td>${book.name}</td>  
        <td>${book.price}</td>
        <td><button onclick="removeBook(${book.BOOK_NO})">삭제</button></td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

}

// 책 삭제 기능
function removeBook(index) {
  console.log("들어온 BOOK_NO:", index);
  console.log(bookList);
  for (let i = 0; i < bookList.length; i++) {
    if (index === bookList[i].BOOK_NO) {
      console.log("찾은 BOOK_NO", bookList[i].BOOK_NO);
      bookList.splice(i, 1);
    }
  }
  printBookList();
}

// 책 목록 정렬
function sortBookList() {


  if (sortSelect.value === 'ascending') { // 오름차순
    bookList.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === 'descending') { // 내림차순
    bookList.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === 'bookno') { // 도서번호순
    bookList.sort((a, b) => a.BOOK_NO - b.BOOK_NO)
  }
  printBookList();

}

// 책 검색
function searchBooks() {

  const syntax = inputSearch.value.toLowerCase();

  if (syntax === '') {
    alert('검색 칸이 비어있습니다.\n검색어를 입력해주세요.');
  } else {
    const filter = bookList.filter(book =>
      book.name.toLowerCase().includes(syntax) || // 영어 이름일 경우 검색하기 쉽게 전부 소문자처리
      book.category.toLowerCase().includes(syntax));

    tableBody.innerHTML = '';
    filter.forEach((book) => {
      let row = `
      <tr>
        <td>${book.BOOK_NO}</td>
        <td>${book.category}</td>
        <td>${book.name}</td>  
        <td>${book.price}</td>
        <td><button onclick="removeBook(${bookList.indexOf(book.BOOK_NO)})">삭제</button></td>
      </tr>
    `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }
}

// 엔터키 입력으로 추가하기
function bookEnterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 없으면 이상해짐
    registerBook();
  }
}

// 엔터키 입력으로 검색하기
function searchEnterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 없으면 이상해짐
    searchBooks();
  }
}

// 이벤트 리스너 추가
inputSearchBtn.addEventListener('click', searchBooks);
sortSelect.addEventListener('change', sortBookList);
bookPriceInput.addEventListener('keypress', bookEnterKey);  // 엔터키
searchInput.addEventListener('keypress', searchEnterKey);  // 엔터키

printBookList();

// 아래는 테스트용

// 예제 도서 데이터 추가
bookList = [
  { BOOK_NO: 1, category: '소설', name: '책1', price: 12000 },
  { BOOK_NO: 2, category: '시/에세이', name: '책2', price: 8000 },
  { BOOK_NO: 3, category: '인문', name: '책3', price: 15000 },
  { BOOK_NO: 4, category: '요리', name: '책4', price: 10000 },
  { BOOK_NO: 5, category: '자기계발', name: '책5', price: 20000 },
  { BOOK_NO: 6, category: '역사/문화', name: '책6', price: 18000 },
  { BOOK_NO: 7, category: '소설', name: '책7', price: 14000 },
  { BOOK_NO: 8, category: '시/에세이', name: '책8', price: 7000 },
  { BOOK_NO: 9, category: '인문', name: '책9', price: 22000 },
  { BOOK_NO: 10, category: '요리', name: '책10', price: 13000 },
  { BOOK_NO: 11, category: '인문', name: 'Book1', price: 13000 },
  { BOOK_NO: 12, category: '시/에세이', name: 'Book2', price: 16000 },
  { BOOK_NO: 13, category: '시/에세이', name: 'lowercase_book1', price: 15900 },
  { BOOK_NO: 14, category: '시/에세이', name: 'lowercase_book2', price: 18000 },
];

// BOOK_NO 재설정 확인
BOOK_NO = bookList.length + 1;
console.log(BOOK_NO);

// 도서 목록 출력
printBookList();