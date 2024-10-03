import Header from "./Header";
import "./App.css";
import { useEffect, useState } from "react";
import { ContainerCards } from "./ComicCard";
import { FavoritesContainer } from "./ComicCard";
import { SearchBar } from "./SearchBar";

function AgentCard() {
  const [text, setText] = useState("");
  const [agentesValorant, setAgentesValorant] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Todos");
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error: ${respuesta.status}`);
        }
        return respuesta.json();
      })
      .then((data) => {
        setAgentesValorant(data.data || []);
        setFilteredAgents(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = agentesValorant;
    if (selectedRole !== "Todos") {
      filtered = filtered.filter(agent => agent.role.displayName === selectedRole);
    }
    if (text) {
      filtered = filtered.filter(agent => agent.displayName.toLowerCase().includes(text.toLowerCase()));
    }
    setFilteredAgents(filtered);
  }, [selectedRole, text, agentesValorant]);

  const addFavorite = (agent) => {
    if (favorites.length < 5 && !favorites.includes(agent)) {
      setFavorites([...favorites, agent]);
    }else(
      <p>Error: {error.message}</p>
    )
  };

  const removeFavorite = (agent) => {
    setFavorites(favorites.filter(fav => fav.uuid !== agent.uuid));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function handleChangeText(value) {
    setText(value);
  }

  return (
    <>
      <Header text={text} handleChangeText={handleChangeText}></Header>
      <div className="flex justify-between">
      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
        className="  my-2 p-2 border">
        <option value="Todos">Todos</option>
        <option value="Duelist">Duelist</option>
        <option value="Initiator">Initiator</option>
        <option value="Controller">Controller</option>
        <option value="Sentinel">Sentinel</option>
      </select>
      <FavoritesContainer
        favorites={favorites}
        removeFavorite={removeFavorite}
      ></FavoritesContainer>
      <SearchBar searchText={text} handleChangeText={handleChangeText}></SearchBar>

      </div>      
      <ContainerCards text={text} agentes={filteredAgents}  addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        favorites={favorites}></ContainerCards>
    </>
  );
}


export default AgentCard;
