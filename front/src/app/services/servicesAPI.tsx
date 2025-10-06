export interface ServiceType {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  promo: boolean;
}

export const getServices = async (): Promise<ServiceType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
    cache: "no-store", // opcional: para siempre traer datos frescos
  });

  if (!res.ok) {
    throw new Error("Error al obtener los servicios");
  }

  const data: ServiceType[] = await res.json();
  return data;
};
