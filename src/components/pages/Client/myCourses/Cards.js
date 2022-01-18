import React from "react";
import Card from "./Card";

import image1 from "../../../../assets/images/episodes/flutter.png";
import image2 from '../../../../assets/images/episodes/React.png'
import image3 from '../../../../assets/images/episodes/laravel.png'

const cards = [
  {
    id: 1,
    title: "Flutter",
    image: image1,
    url: "https://flutter.dev",
    description:"Flutter est un kit de développement logiciel d'interface utilisateur open-source créé par Google. Il est utilisé pour développer des applications pour Android, iOS, Linux, Mac, Windows, Google Fuchsia et le web à partir d'une seule base de code.",
  },
  {
    id: 2,
    title: "React",
    image: image2,
    url: "https://fr.reactjs.org",
    description:"React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page HTML à chaque changement d'état.",
  },
  {
    id: 3,
    title: "Laravel",
    image: image3,
    url: "https://laravel.com",
    description:"Laravel est un framework web open-source écrit en PHP respectant le principe modèle-vue-contrôleur et entièrement développé en programmation orientée objet. Laravel est distribué sous licence MIT, avec ses sources hébergées sur GitHub.",
  },
];

function Cards() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100" style={{padding : '0 4rem'}}>
      <div className="row">
        {cards.map(({ title, image, url, id,description }) => (
          <div className="col-md-4" key={id}>
            <Card description={description} imageSource={image} title={title} url={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;