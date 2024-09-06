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
      const newBook = { BOOK_NO: BOOK_NO++, category: bookCategory, name: bookName, price: bookPrice };
      bookList.push(newBook);
      addBook(newBook);
    }
  } else { // 빈칸 체크
    let errors = [];
    if (bookCategory === "") errors.push("카테고리가 선택되지 않았습니다.");
    if (bookName === "") errors.push("책 이름이 빈칸입니다.");
    if (bookPrice === "") errors.push("책 가격이 빈칸입니다.")

    alert(errors.join("\n"));
  }
}

// 코드가 복잡해서 함수로 뺌
function addBook(book) {
  const row = `
  <tr>
    <td>${book.BOOK_NO}</td>
    <td>${book.category}</td>
    <td>${book.name}</td>  
    <td>${book.price}</td>
    <td><button onclick="removeBook(${book.BOOK_NO})">삭제</button></td>
  </tr>
`;
  tableBody.insertAdjacentHTML("beforeend", row);
}

// 책 목록 출력기능
function printBookList() {
  tableBody.innerHTML = '';
  bookList.forEach(el => addBook(el));
}

// 책 삭제 기능
// findIndex(): 배열에서 특정 조건을 만족하는 요소를 찾아 첫 번째 요소의 인덱스를 반환하는 함수
function removeBook(bookNo) {
  const index = bookList.findIndex(book => book.BOOK_NO === bookNo);
  if (index !== -1) {
    bookList.splice(index, 1);
    printBookList();
  }
}

// 책 목록 정렬
function sortBookList() {
  const sortType = sortSelect.value;

  if (sortType === 'ascending') { // 오름차순
    bookList.sort((a, b) => a.price - b.price);
  } else if (sortType === 'descending') { // 내림차순
    bookList.sort((a, b) => b.price - a.price);
  } else if (sortType === 'bookno') { // 도서번호순
    bookList.sort((a, b) => a.BOOK_NO - b.BOOK_NO)
  }
  printBookList();

}

// 책 검색
function searchBooks() {
  const syntax = inputSearch.value.toLowerCase();

  if (!syntax) {
    alert('검색 칸이 비어있습니다.\n검색어를 입력해주세요.');
  } else {
    const filter = bookList.filter(book =>
      book.name.toLowerCase().includes(syntax) || // 영어 이름일 경우 검색하기 쉽게 전부 소문자처리
      book.category.toLowerCase().includes(syntax));

    tableBody.innerHTML = '';
    filter.forEach(el => addBook(el));
  }
}

// 엔터키로 입력받게
function enterKey(key, func) {
  if (key.key === 'Enter') {
    key.preventDefault();
    func();
  }
}

// 이벤트 리스너 추가
inputSearchBtn.addEventListener('click', searchBooks);
sortSelect.addEventListener('change', sortBookList);
bookPriceInput.addEventListener('keypress', key => enterKey(key, registerBook));
searchInput.addEventListener('keypress', key => enterKey(key, searchBooks));

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
  { BOOK_NO: 15, category: '시/에세이', name: 'UPPERCASE_BOOK1', price: 23800 },
  { BOOK_NO: 16, category: '시/에세이', name: 'UPPERCASE_BOOK2', price: 33800 }
];

// BOOK_NO 재설정 확인
BOOK_NO = bookList.length + 1;

// 도서 목록 출력
printBookList();