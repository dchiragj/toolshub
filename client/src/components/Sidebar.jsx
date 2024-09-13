import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import LanguageSelector from "./LanguageSelector";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdKeyboardArrowDown } from "react-icons/md";
import {} from "./LanguageSelector"

const Sidebar = ({ expandSidebar, setExpandSidebar }) => {

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const toggleSideBar = () => {
    setExpandSidebar(!expandSidebar)
  }

  return (
    <>
      <div
        className={`w-[80%] sm:w-[50%] dark:bg-darkBlue flex flex-col gap-2 lg:hidden p-4 bg-gray-100 shadow-xl absolute ${expandSidebar ? 'left-0' : '-left-[500px]'} top-[72px] overflow-y-auto`}
        style={{ height: "calc(100vh - 72px)" }}
      >
        <li className="list-none outline-none rounded-lg mb-3">
          <p className="mb-3 text-black dark:text-gray50 text-[15px]">Select Language</p>
          <LanguageSelector width={"100%"} />
        </li>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{borderRadius:"12px !important"}}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<MdKeyboardArrowDown fontSize={26}/>}>
            <Typography>PDF</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
