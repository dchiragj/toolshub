import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdKeyboardArrowDown } from "react-icons/md";
import { AIImageTools, AIImageTools1, featuredTools, fileTools, otherFeaturedTools, otherImageTools, otherOtherTools, otherTextTools, pdfFeatured, popularPdfTools, textFeaturedTools } from "../Helpers/HeaderHelper";
import { NavLink } from 'react-router-dom'
import { useAuth } from "../Context/AllContext";
import LanguageSelector from "../LanguageSelector";

const Sidebar = ({ expandSidebar, setExpandSidebar }) => {

  const [expanded, setExpanded] = React.useState();
  const {darkMode} = useAuth();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const toggleSideBar = () => {
    setExpandSidebar(!expandSidebar)
  }

  const sideBarTools = [
    {
      panel: 'panel1',
      name: 'PDF',
      title1: 'Featured Tools',
      option1: pdfFeatured,
      title2: 'Popular PDF Tools',
      option2: popularPdfTools
    },
    {
      panel: 'panel2',
      name: 'IMAGE',
      title1: 'All Image Tools',
      option1: [...AIImageTools, ...AIImageTools1],
      title2: 'Other Image Tools',
      option2: [...featuredTools, ...otherImageTools]
    },
    {
      panel: 'panel3',
      name: 'TEXT',
      title1: 'Featured Tools',
      option1: textFeaturedTools,
      title2: 'Other Text Tools',
      option2: otherTextTools
    },
    {
      panel: 'panel4',
      name: 'FILE',
      title1: 'File Tools',
      option1: fileTools
    },
    {
      panel: 'panel5',
      name: 'OTHERS',
      title1: 'Featured Tools',
      option1: otherFeaturedTools,
      title2: 'Other Tools',
      option2: otherOtherTools
    }
  ]

  return (
    <>
      <div
        className={`w-[80%] bg-white sm:w-[50%] dark:bg-darkBlue flex flex-col gap-2 lg:hidden p-4 bg-gray-100 shadow-xl absolute ${expandSidebar ? 'left-0' : '-left-[500px]'} top-[72px] overflow-y-auto`}
        style={{ height: "calc(100vh - 72px)" }}
      >
        <li className="list-none outline-none rounded-lg mb-3">
          <p className="mb-3 text-black dark:text-gray200 text-[15px]">Select Language</p>
          <LanguageSelector width={"100%"} />
        </li>
        {
          sideBarTools.map((val, ind) => {
            return (
              <Accordion key={ind} expanded={expanded === val.panel} onChange={handleChange(val.panel)} sx={{borderRadius: "12px !important",backgroundColor: darkMode ? "#1a252e":"white",color: darkMode?"white":""}} className="bg-black">
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<MdKeyboardArrowDown fontSize={26} color={`${darkMode ? "white" : "black"}`}/>}>
                  <Typography>{val.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <p className={`text-sm text-gray200 mb-3`}>{val.title1}</p>
                  <div className="flex flex-col">
                    {val.option1?.map((val, ind) => {
                      return (
                        <NavLink key={ind} onClick={toggleSideBar} className={"w-full p-3 hover:bg-[aliceblue] hover:text-lightBlue rounded-lg"} to={val.link}>
                          {val.title}
                        </NavLink>
                      )
                    })}
                  </div>
                  {
                    val.title2 && val.option2 &&
                    <>
                      <p className="text-sm text-gray200 my-3">{val.title2}</p>
                      <div className="flex flex-col">
                        {val.option2?.map((val, ind) => {
                          return (
                            <NavLink key={ind} onClick={toggleSideBar} className={"w-full p-3 hover:bg-[aliceblue] hover:text-lightBlue rounded-lg"} to={val.link}>
                              {val.title}
                            </NavLink>
                          )
                        })}
                      </div>
                    </>
                  }
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </div>
    </>
  );
};

export default Sidebar;
