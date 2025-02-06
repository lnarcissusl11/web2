const subcategoryOptions = {
  housing: ["월세", "전세대출이자", "원리금상환", "관리비"],
  communication: ["스마트폰", "TV", "인터넷", "TV+인터넷"]
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