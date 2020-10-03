import { useRef } from "react";

interface IdGenerator {
  (): string;
}

const newIdGenerator = (prefix: string): IdGenerator => {
  let index = 0;
  return () => `${prefix}-${index++}`;
};

const globalIdGeneratorsFactory = () => {
  let generators: Record<string, IdGenerator> = {};
  return (prefix: string) => {
    if (!generators[prefix]) {
      generators = { ...generators, [prefix]: newIdGenerator(prefix) };
    }
    return generators;
  };
};

const useGlobalIdGenerators = globalIdGeneratorsFactory();

export const useUniqueId = (prefix: string) => {
  const generators = useGlobalIdGenerators(prefix);
  const id = useRef(generators[prefix]())
  return id.current;
};
