import { motion } from "framer-motion";
import { getPromos } from "@/api/promos";
import { useQuery } from "@tanstack/react-query";

export default function ProductMarquee() {
  const { data: promosData = {}, isLoading } = useQuery({
    queryKey: ["promo-messages"],
    queryFn: async () => {
      const data = await getPromos();
      return data;
    },
  });

  // Ensure messages is always an array
  const messages = Array.isArray(promosData.promos) 
    ? promosData.promos 
    : Array.isArray(promosData) 
      ? promosData 
      : [];
  
  const activeMessages = Array.isArray(messages) 
    ? messages.filter(msg => msg?.is_active === true)
    : [];

  if (isLoading || activeMessages.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-4 overflow-hidden relative w-full">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative flex">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...activeMessages, ...activeMessages, ...activeMessages].map((msg, index) => (
            <div
              key={`${msg.id}-${index}`}
              className="flex items-center gap-3 text-white"
            >
              <span className="text-xl font-bold tracking-wide drop-shadow-lg">
                {msg.message}
              </span>
              <span className="text-white/40 mx-4">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}