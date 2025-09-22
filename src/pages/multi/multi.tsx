import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import "./multi.css";
import TabCreateRoom from "../../components/tabCreateRoom/tabCreateRoom";
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
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
export default Multi;
