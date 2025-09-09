import Image from "next/image"
import { cn } from "@/utils/cn"

export default function StackedCards() {
  const cards = ["/images/isometric_card_1.png", "/images/isometric_card_2.png", "/images/isometric_card_3.png"]
  return (
    <div className="animate-fade-down flex h-full w-full items-center justify-center">
      <div className="group relative aspect-video max-h-[16rem] w-full md:max-h-[20rem]">
        {cards.map((card, index) => (
          <Image
            src={card}
            alt="Credit Card Image"
            width={500}
            height={325}
            key={index}
            className={cn(
              "absolute inset-0 m-auto h-full w-full object-contain object-center transition-all duration-500 ease-out",
              index === 0 && "perspective-distant group-hover:translate-y-4 group-hover:-rotate-8",
              index === 1 && "-translate-x-1 translate-y-2 perspective-near group-hover:translate-y-0 group-hover:-rotate-2",
              index === 2 && "perspective-dramatic group-hover:-translate-y-8 group-hover:rotate-6"
            )}
            priority
          />
        ))}
      </div>
    </div>
  )
}
