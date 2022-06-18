import {useState} from "react";

export default function useLoading(parent: boolean) {
  const [loading, setLoading] = useState(false);
  return {loading: parent || loading, setLoading}
}

export function useHandling(parent: boolean) {
  const {loading, setLoading} = useLoading(parent);
  return {handling: loading, setHandling: setLoading}
}
