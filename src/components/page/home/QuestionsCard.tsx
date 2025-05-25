import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";


const QuestionsCard = ({details,id,title}:{title:string,details:string, id:string}) => {
  return (
    <AccordionItem  className="border-none rounded-md p-4 bg-white text-gray-800 shadow-sm dark:bg-card dark:text-card-foreground" value={id}>
        <AccordionTrigger className="text-right leading-9">{title}</AccordionTrigger>
        <AccordionContent className="px-3 py-8 border-t-2 border-gray-100 text-gray-600 dark:text-gray-200 dark:border-gray-300">
            {details}
        </AccordionContent>
  </AccordionItem>

  );
};
export default QuestionsCard;