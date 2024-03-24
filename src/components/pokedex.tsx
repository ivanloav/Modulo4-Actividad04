import c from "classnames";
import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition } from "hooks";
import { useState } from "react";
import { randomMode } from "utils/random";
import { Button } from "./button";
import { LedDisplay } from "./led-display";

import { weaknesses, typeTranslations } from "../@types/pokemon-weakness-translation";

import "./pokedex.css";

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);

  const prev = () => {
    resetTransition();
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI((i) => i - 1);
  };

  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI((i) => i + 1);
  };
/* **************************************************************************************** */
  const BASE_SRC_IMG = "/src/assets/types/";
  
  const getCombinedWeaknesses = (types: string[]) => {
    const allWeaknesses: string[] = [];
    types.forEach(type => {
      const typeWeaknesses = weaknesses[type];
      if (typeWeaknesses) {
        typeWeaknesses.forEach(weakness => {
          if (!allWeaknesses.includes(weakness)) {
            allWeaknesses.push(weakness);
          }
        });
      }
    });
    return allWeaknesses;
  };

  const translateType = (type: string): string => {
    return typeTranslations[type.toLowerCase()] || type;
  };

  // Obtener las debilidades combinadas para los tipos del Pokémon
  const pokemonWeaknesses = getCombinedWeaknesses(selectedPokemon?.types.map(({ type }) => type.name) || []);
/* **************************************************************************************** */
  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="pokeWeakness">
          <h3>Debilidades</h3>
          <div className="weaknessesImg-container">
            {pokemonWeaknesses.map((weakness, index) => (
              <div className="weaknessesImg" key={index}>
                <img src={BASE_SRC_IMG + weakness + ".webp"} alt={weakness} />
                <p className={c({ 'text-black': theme === 'yellow' })}>{translateType(weakness)}</p>
              </div>
            ))}
          </div>
      </div>
      <div className="panel left-panel">
        <div className="screen main-screen">
          {selectedPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
        </div>
        <div className="screen name-display">
          <div
            className={c(
              "name",
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>
        <div className="pokeType">
          {selectedPokemon?.types.map((typeEntry, index) => (
            <div key={index}>
              <img src={BASE_SRC_IMG + typeEntry.type.name + ".webp"} alt={typeEntry.type.name} />
              <p className={c({ 'text-black': theme === 'yellow' })}>{translateType(typeEntry.type.name)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div className="screen second-screen">
          {nextPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={nextPokemon.sprites.front_default}
              alt={nextPokemon.name}
            />
          )}
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
    </div>
  );
}
