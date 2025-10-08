import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import "./multi.css";
import TabCreateRoom from "../../components/tabCreateRoom/tabCreateRoom";
import TabJoinRoom from "../../components/tabJoinRoom/tabJoinRoom";
function Multi() {
  return (
    <>
      <div className='text' />
      <Tabs
        className='tab'
        isLazy
        isFitted
        size={"lg"}
        variant={"soft-rounded"}
        colorScheme='blue'>
        <TabList color={"white"}>
          <Tab>Create room</Tab>
          <Tab>Join room</Tab>
        </TabList>

        <TabPanels>
          <TabCreateRoom />
          <TabPanel>
            <TabJoinRoom />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
export default Multi;
