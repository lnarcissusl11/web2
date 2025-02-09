const datePicker = document.getElementById("datePicker");
const dateText = document.getElementById("dateText");

// 사용자가 8자리 YYYYMMDD 입력하면 date 필드에 자동 변환
dateText.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, ""); // 숫자만 입력 허용

    if (value.length === 8) {
        let formattedDate = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
        datePicker.value = formattedDate; // date 필드 업데이트
    }
});

// 달력에서 날짜를 선택하면 YYYYMMDD 형식으로 text 필드 업데이트
datePicker.addEventListener("change", function () {
    let value = this.value.replace(/-/g, ""); // YYYY-MM-DD → YYYYMMDD
    dateText.value = value;
});

document.getElementById("date").addEventListener("keydown", function (event) {
    let key = event.key;
    if (!/[\d]/.test(key) && key !== "Backspace" && key !== "Tab") {
        event.preventDefault();
    }
});

const subcategoryOptions = {
  housing: ["월세", "전세대출이자", "원리금상환", "관리비"],
  communication: ["스마트폰", "TV", "인터넷", "TV+인터넷"],
  subscribe: ["쿠팡", "네이버페이", "유튜브", "넷플릭스", "웨이브", "티빙", "스포티비", "멜론", "비데"],
  financial: ["마통이자", "보험"],
  food: ["식자재", "점심", "저녁", "야식", "군것질", "커피", "생수"],necessities: ["씻기", "욕실", "주방", "세탁", "청소", "렌즈"],
  shopping: ["의류", "취미", "수선비"],
  transportation: ["대중교통", "택시", "시외버스", "기차", "비행기"],
  차량비: ["주유비", "주차비", "보험", "하이패스", "세차", "정비"],
  culture: ["영화", "도서", "운동"],
  relation: ["경조사비", "식사", "커피", "생일선물", "용돈"],
  study: ["도서", "강의", "필기구장비"],
  trim: ["미용실"],
  medical: ["병원", "약국"],
  etc: ["이외"]
};

document.getElementById("category").addEventListener("change", function () {
  const category = this.value;
  const subcategorySelect = document.getElementById("subcategory");
  
  console.log("Selected category:", category); // 선택된 카테고리 확인
  console.log("Subcategory options:", subcategoryOptions[category]); // 해당하는 서브카테고리 옵션 확인

  subcategorySelect.innerHTML = '<option value="">선택</option>';

  if (category && subcategoryOptions[category]) {
      subcategoryOptions[category].forEach(sub => {
          const option = document.createElement("option");
          option.value = sub;
          option.textContent = sub;
          subcategorySelect.appendChild(option);
      });
      subcategorySelect.disabled = false;
  } else {
      subcategorySelect.disabled = true;
  }
});

// 태그등록

// 태그 추가 모달 HTML 추가
const modalHTML = `
  <div id="tagModal" class="modal" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: white; padding: 20px; border: 1px solid #ccc; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
    <h3>태그 추가</h3>
    <label>태그 기준: <input type="text" id="tagCategory"></label><br><br>
    <label>태그1: <input type="text" id="tag1"></label><br>
    <label>태그2: <input type="text" id="tag2"></label><br>
    <label>태그3: <input type="text" id="tag3"></label><br>
    <label>태그4: <input type="text" id="tag4"></label><br>
    <label>태그5: <input type="text" id="tag5"></label><br><br>
    <button id="saveTags">저장</button>
    <button id="closeModal">닫기</button>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

// 태그 리스트 추가할 div
const tagsContainer = document.createElement("div"); 
document.getElementById("addtags").insertAdjacentElement("afterend", tagsContainer);

// 태그 추가 버튼 클릭 시 모달 열기
document.getElementById('addtags').addEventListener('click', function() {
    document.getElementById("tagModal").style.display = "block";
});

// 모달 닫기 버튼
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("tagModal").style.display = "none";
});

// 태그 저장 버튼 클릭 시
document.getElementById("saveTags").addEventListener("click", function() {
    const category = document.getElementById("tagCategory").value.trim();
    if (!category) {
        alert("태그 기준을 입력하세요!");
        return;
    }

    const newTags = [];
    for (let i = 1; i <= 5; i++) {
        const tagValue = document.getElementById(`tag${i}`).value.trim();
        if (tagValue) newTags.push(tagValue); // 입력값이 있으면 추가
    }

    if (newTags.length === 0) {
        alert("최소 하나의 태그를 입력해야 합니다.");
        return;
    }

    // 태그 UI 추가
    const tagWrapper = document.createElement("div");
    tagWrapper.style.display = "flex";
    tagWrapper.style.gap = "10px";
    tagWrapper.style.alignItems = "center";
    tagWrapper.style.marginTop = "5px";

    // 태그 기준 표시
    const categoryLabel = document.createElement("span");
    categoryLabel.textContent = `[${category}]`;
    categoryLabel.style.fontWeight = "bold";
    tagWrapper.appendChild(categoryLabel);

    // 태그 체크박스 추가
    newTags.forEach(tag => {
        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.gap = "5px";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = tag;
        checkbox.classList.add("tag-checkbox");

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tag));
        tagWrapper.appendChild(label);
    });

    tagsContainer.appendChild(tagWrapper);
    document.getElementById("tagModal").style.display = "none"; // 모달 닫기
});

document.getElementById("registerSpend").addEventListener("click", function () {
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const subcategory = document.getElementById("subcategory").value;
    const description = document.querySelector("input[type='text']").value;
    const amount = document.querySelector("input[type='money']").value;

    if (!date || !category || !subcategory || !description || !amount) {
        alert("모든 항목을 입력해주세요!");
        return;
    }

    const table = document.querySelector("table tbody");
    const rowCount = table.rows.length; // 현재 등록된 행 개수 가져오기
    const id = rowCount + 1; // 식별 번호 (1부터 시작)

    // 새로운 행을 첫 번째 위치에 추가
    const newRow = table.insertRow(0); // 인덱스 0에 추가하면 위에서부터 쌓임
    newRow.insertCell(0).textContent = id;
    newRow.insertCell(1).textContent = date;
    newRow.insertCell(2).textContent = category;
    newRow.insertCell(3).textContent = subcategory;
    newRow.insertCell(4).textContent = description;
    newRow.insertCell(5).textContent = amount;
    
    // 선택한 태그 추가
    const tagCell = newRow.insertCell(6);
    document.querySelectorAll(".tag-checkbox:checked").forEach(tag => {
        tagCell.appendChild(document.createTextNode(tag.value + " "));
    });

    // 입력값 초기화
    document.querySelector(".spend-register").reset();
});