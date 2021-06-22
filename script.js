class courses {
  constructor(course, description, duraction, Sdate, Edate) {
    this.course = course;
    this.description = description;
    this.duraction = duraction;
    this.Sdate = Sdate;
    this.Edate = Edate;
  }
}

class ui {
  static displayCourses() {
    const someCourses = Store.getCourses();

    someCourses.forEach((item) => ui.addCourse(item));
  }

  static addCourse(vector) {
    const list = document.querySelector("#courses-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${vector.course}</td>
    <td>${vector.description}</td>
    <td>${vector.duraction}</td>
    <td>${vector.Sdate}</td>
    <td>${vector.Edate}</td>
    `;
    list.appendChild(row);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#Sdate").value = "";
    document.querySelector("#Edate").value = "";
    document.querySelector("#duraction").value = "";
    document.querySelector("#description").value = "";
  }
}

class Store {
   static getCourses () {
    let cursos;
    if(localStorage.getItem('cursos') === null){
        cursos = [];
    } else {
        cursos = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursos
    }

   static addCourses (course) {
    const cursos = Store.getCourses();
    cursos.push(course)
    localStorage.setItem('cursos', JSON.stringify(cursos));


    }
    
}

document.addEventListener("DOMContentLoaded", ui.displayCourses);

document.querySelector("#course-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const course = document.querySelector("#title").value;
  const startDate = document.querySelector("#Sdate").value;
  const endDate = document.querySelector("#Edate").value;
  const duraction = document.querySelector("#duraction").value;
  const description = document.querySelector("#description").value;

  if (
    course === "" ||
    startDate === "" ||
    endDate === "" ||
    duraction === "" ||
    description === ""
  ) {
    alert("Por favor, preencha todos os campos!");
  } else {
    const nameCourse = new courses(
      course,
      startDate,
      endDate,
      duraction,
      description
    );

    ui.addCourse(nameCourse);

    Store.addCourses(nameCourse);

    ui.clearField();
  }
});




const searchCourse = document.querySelector('#search')
searchCourse.addEventListener('keyup', (e) => {
    const name = e.target.value.toLowerCase();
    const curso = document.querySelector('.table-content')
    const search = curso.getElementsByTagName('tr')
    Array.from(search).forEach(function(cursos){
        const title = cursos.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(name) != -1){
            cursos.style.display = 'block'
        } else {
            cursos.style.display = 'none'
        }
    })
})