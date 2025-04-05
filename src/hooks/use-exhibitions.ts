import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useExhibitions = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://glasmuseum-frauenau.de/wp-json/wp/v2/exhibition?_embed"
      );
      return data;
    },
  });
};
