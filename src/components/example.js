//Заполняет профиль на основе данных с сервера
function renderProfile (data) {
  nameField.textContent = data.name;
  jobField.textContent = data.about;
  
}


//обработчик submit формы редактирования профиля
function handleProfileFormSubmit(evt, close) {
  evt.preventDefault(); 
  

  const profileName = inputNameFormEditProfile.value;
  const profileAbout = inputJobFormEditProfile.value;

  const profileInfo = {
    name: profileName,
    about: profileAbout,
  };

  updateProfileInfo(profileInfo)
    .then((data) => {
      renderProfile(data)
      close(popupTypeEdit);
      formEditProfile.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, popupTypeEdit)
    })        
};


const updateProfileInfo = (info) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
  })
  .then((res) => {
    return checkResponse(res)
  })
}