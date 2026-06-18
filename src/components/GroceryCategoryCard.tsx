type Category = {
  id: string | number;
  name: string;
  image: string;
  bgColor?: string;
  borderColor?: string;
};

const GroceryCategoryCard = ({ category, onClick }: { category: Category; onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      key={category.id}
      className="flex flex-col h-max items-center justify-center p-4 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
      style={{
        backgroundColor: category.bgColor,
        border: `1px solid ${category.borderColor}`,
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-24 h-24 object-contain mb-2"
      />
      <h3 className="text-base font-medium text-[#181725] text-center">
        {category.name}
      </h3>
    </div>
  );
};

export default GroceryCategoryCard;
