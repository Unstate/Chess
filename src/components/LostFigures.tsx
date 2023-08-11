import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: React.FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <section className="relative bottom-[1.81px] right-[55.5px] h-[calc(64px_*_4)] px-2 flex flex-col flex-wrap">
      <h3>{title}</h3>
      {figures.map((figure: Figure) => (
        <div className="flex items-center gap-1" key={figure.id}>
          <p className="w-12">{figure.name}</p>
          {figure.logo && <img className="h-8" src={figure.logo} />}
        </div>
      ))}
    </section>
  );
};

export default LostFigures;
