document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task');
  const titleInput = document.getElementById('task-title');
  const descriptionInput = document.getElementById('task-description');
  const taskList = document.getElementById('task-list');
  const taskFilterContainer = document.querySelector('.task-filter');
  const filters = document.querySelectorAll('.task-filter button');

  let tasks = [];

  // Функция для обновления видимости блока с фильтрами
  const updateFilterVisibility = () => {
    if (tasks.length > 0) {
      taskFilterContainer.classList.remove('hidden');
    } else {
      taskFilterContainer.classList.add('hidden');
    }
  };

  // Функция для отображения задач на странице
  const renderTasks = () => {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
      if (document.getElementById('filter-all').classList.contains('active')) return true;
      if (document.getElementById('filter-active').classList.contains('active')) return !task.completed;
      if (document.getElementById('filter-completed').classList.contains('active')) return task.completed;
    });

    // Создаем элементы для каждой задачи в отфильтрованном списке
    filteredTasks.forEach((task, index) => {
      const taskElement = document.createElement('li');
      const taskText = document.createElement('span');
      taskText.innerHTML = `<b>${task.title}:</b> ${task.description}`;
      if (task.completed) {
        taskText.style.textDecoration = 'line-through';
      }
      taskElement.appendChild(taskText)

      // Добавляем возможность переключать состояние задачи по клику
      taskElement.addEventListener('click', () => {
        task.completed = !task.completed;
        renderTasks();
      });

      // Создаем кнопку для удаления задачи и добавляем обработчик событий
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        renderTasks();
      });
      taskElement.appendChild(deleteButton);
      taskList.appendChild(taskElement);
    });

    updateFilterVisibility(); // Обновляем видимость фильтров после рендеринга задач
  };

  // Обработчик событий для кнопки добавления новой задачи
  addButton.addEventListener('click', () => {
    if (titleInput.value && descriptionInput.value) {
      tasks.push({ title: titleInput.value, description: descriptionInput.value, completed: false });
      titleInput.value = '';
      descriptionInput.value = '';
      renderTasks();
    }
  });

  // Добавляем обработчики событий для кнопок фильтрации задач
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      document.querySelector('.task-filter .active').classList.remove('active');
      filter.classList.add('active');
      renderTasks();
    });
  });

  renderTasks();
});
