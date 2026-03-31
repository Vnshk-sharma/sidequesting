import WorldLayout from "@/components/WorldLayout";
import QuestList from "@/components/QuestList";
import { studyQuests } from "@/data/studyQuests";

const StudyWorld = () => (
  <WorldLayout worldName="Study World">
    <QuestList worldId="study" worldName="Study World" worldEmoji="📚" quests={studyQuests} />
  </WorldLayout>
);

export default StudyWorld;
