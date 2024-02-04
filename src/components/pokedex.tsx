import c from "classnames";
import { useState } from "react";
import { useTheme } from "../contexts/theme-context";
import { usePokemon, usePokemonList } from "../hooks/use-pokemon";
import { useTextTransition } from "../hooks/use-text-transition";
import { Button } from "./button";
import { LedDisplay } from "./led-display";

import "./pokedex.css";

export function Pokedex() {
  const { theme } = useTheme();
  const { transition, resetTransition } = useTextTransition();
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

  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        <div className="screen main-screen">
          {selectedPokemon && (
            <img
              className={c("sprite", transition && "obfuscated")}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
        </div>
        <div className="screen name-display">
          <div className={c("name", transition && "obfuscated")}>
            {selectedPokemon?.name}
          </div>
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
              className={c("sprite", transition && "obfuscated")}
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