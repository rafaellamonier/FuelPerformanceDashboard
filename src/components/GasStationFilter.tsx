import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostoFilterProps {
  onPostoChange: (posto: string | null) => void;
  className?: string;
}

export function PostoFilter({ onPostoChange, className }: PostoFilterProps) {
  const postos = [
    { id: "all", name: "Todos os Postos" },
    { id: "posto-IV", name: "Posto Tabocão IV (Goiânia - GO)" },
    { id: "posto-V", name: "Posto Tabocão V (Goiânia - GO)" },
    { id: "posto-VI", name: "Posto Tabocão VI (Portelândia - GO)" },
    { id: "posto-VII", name: "Posto Tabocão VII (Nerópolis – GO)" },
    { id: "posto-X", name: "Posto Tabocão X (Anápolis – GO)" },
  ];

  const handleValueChange = (value: string) => {
    const selectedPosto = value === "all" ? null : value;
    onPostoChange(selectedPosto);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Select defaultValue="all" onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um posto" />
          </SelectTrigger>
          <SelectContent>
            {postos.map((posto) => (
              <SelectItem key={posto.id} value={posto.id}>
                {posto.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
