import { useState } from "react";

function ContainerCards({ text, agentes, addFavorite, removeFavorite, favorites  }) {
  const objetosFiltrados = agentes.filter((o) =>
    o.displayName.toUpperCase().includes(text.toUpperCase())
  );

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center">
        {objetosFiltrados.map((o) => (
          <ComicCard
            key={o.id}
            title={o.displayName.toUpperCase()}
            image={o.displayIcon}

            addFavorite={() => addFavorite(o)}
            removeFavorite={() => removeFavorite(o)}
            isFavorite={favorites.some(fav => fav.uuid === o.uuid)}
          ></ComicCard>
        ))}
      </div>
    </>
  );
}

function FavoritesContainer({ favorites, removeFavorite }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Favoritos</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {favorites.map(agent => (
          <ComicCard
            key={agent.uuid}
            title={agent.displayName.toUpperCase()}
            image={agent.displayIcon}
            removeFavorite={() => removeFavorite(agent)}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}

function ComicCard({ title, image, addFavorite, removeFavorite, isFavorite  }) {

  const [details, setDetails] = useState(false);

  function handleClickDetails() {
    setDetails(!details);
  }

  
  return (
    <div className="relative group w-64 flex flex-col justify-between">
      <div className="bg-black relative w-full h-5/6">
        <img
          src={image}
          alt={title}
          className="w-full h-full transition-opacity duration-300 group-hover:opacity-30 object-cover"
        />
        <div className="absulte bottom-0 left-0 right-0 p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
            className="bg-yellow-500 text-black px-4 py-2 font-bold w-full"
            onClick={handleClickDetails}
          >
            {details ? 'Ocultar Detalles' : 'Detalles'}
          </button>
          <div className="bg-black absolute"></div>
        </div>
        <div className="bg-black/90 h-full w-full absolute left-1 top-1 -z-10"></div>
      </div>

      <div className="h-1/6 relative border-solid border-2 border-slate-400/30 pt-2 pb-6 pl-3">
        <h2 className=" font-bold text-left">{title}</h2>
        <div className="h-1.5 w-1.5 bg-red-500 absolute bottom-0 right-0"></div>
      </div>
      {details && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-white">
          <p>Detalles del agente: {title}</p>
        </div>
      )}

      <button
        onClick={isFavorite ? removeFavorite : addFavorite}
        className={`mt-2 p-2 ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
      >
        {isFavorite ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
      </button>
    </div>
  );
}

export { ContainerCards, ComicCard, FavoritesContainer  };
