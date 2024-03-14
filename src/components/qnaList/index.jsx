import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  Stack,
  Dropdown,
  ButtonGroup,
  Button,
  AvatarGroup,
  Avatar,
} from "rsuite";
import "./style.scss";
import { MediaQueryContext } from "../../context/MediaQueryContext";
import { IoMdSearch } from "react-icons/io";
import "rsuite/dist/rsuite.min.css";
import { HelpContext } from "../../context/HelpContext";
import { Link } from "react-router-dom";

const dummyQuestions = [
  {
    text: "I've been pondering the idea that having a well-rounded and comprehensive profile can substantially augment my chances of garnering attention from colleges and universities. Could you perhaps enlighten me with some insightful tips or sagacious suggestions on how to intricately craft my profile in such a manner that it not only stands out amidst the crowd but also resonates deeply with the discerning eyes of admission officers?",
    avatars: [
      "https://avatars.githubusercontent.com/u/12592949",
      "https://avatars.githubusercontent.com/u/8225666",
      "https://avatars.githubusercontent.com/u/15609339",
    ],
  },
  {
    text: "As I embark upon the arduous yet exhilarating journey of exploring potential colleges and universities, I find myself engulfed in a sea of options, feeling somewhat overwhelmed by the sheer magnitude of the decision that lies ahead. Would you be so kind as to guide me through the intricacies of leveraging the search and filtering features on your esteemed platform, enabling me to adeptly navigate through this labyrinth of choices and ultimately zero in on the institutions that align most harmoniously with my aspirations and goals?",
    avatars: [
      "https://avatars.githubusercontent.com/u/12592949",
      "https://avatars.githubusercontent.com/u/8225666",
      "https://avatars.githubusercontent.com/u/15609339",
      "https://avatars.githubusercontent.com/u/14308293",
      "https://avatars.githubusercontent.com/u/1203827",
      "https://avatars.githubusercontent.com/u/10924138",
    ],
  },
  {
    text: "Could you please elucidate the pivotal factors that one should meticulously consider when faced with the daunting task of choosing between various colleges and universities? It seems to me that such a decision demands a comprehensive evaluation of myriad elements, each bearing its own weight in the grand scheme of academic pursuits and personal growth.",
    avatars: [
      "https://avatars.githubusercontent.com/u/12592949",
      "https://avatars.githubusercontent.com/u/8225666",
      "https://avatars.githubusercontent.com/u/15609339",
      "https://avatars.githubusercontent.com/u/14308293",
      "https://avatars.githubusercontent.com/u/1203827",
    ],
  },
  {
    text: "In my quest to compile a compelling college application, I find myself grappling with the notion of extracurricular activities and their significance in the eyes of admissions committees. Could you shed some light on the extent to which participation in such activities can influence the outcome of my application, and perhaps offer some advice on how to strategically leverage my extracurricular involvements to bolster my candidacy?",
    avatars: [
      "https://avatars.githubusercontent.com/u/12592949",
      "https://avatars.githubusercontent.com/u/8225666",
      "https://avatars.githubusercontent.com/u/15609339",
      "https://avatars.githubusercontent.com/u/14308293",
    ],
  },
  {
    text: "As I navigate through the labyrinthine pathways of college applications, I find myself confronted with the dilemma of early decision versus early action. Could you elucidate the nuances of each approach, delineating the potential benefits and drawbacks of committing to one over the other?",
    avatars: [
      "https://avatars.githubusercontent.com/u/12592949",
      "https://avatars.githubusercontent.com/u/8225666",
      "https://avatars.githubusercontent.com/u/15609339",
      "https://avatars.githubusercontent.com/u/14308293",
      "https://avatars.githubusercontent.com/u/1203827",
      "https://avatars.githubusercontent.com/u/10924138",
    ],
  },
  {
    text: "As I gather the requisite materials for my college applications, I find myself pondering the significance of recommendation letters. Could you elucidate the role these letters play in the admissions process, and perhaps offer some guidance on how to secure compelling recommendations that authentically reflect my character and academic potential?",
    avatars: [
      "https://avatars.githubusercontent.com/u/12592949",
      "https://avatars.githubusercontent.com/u/8225666",
      "https://avatars.githubusercontent.com/u/15609339",
      "https://avatars.githubusercontent.com/u/10924138",
      "https://avatars.githubusercontent.com/u/2797600",
    ],
  },
  // Add more dummy questions and avatars here
];

const QnaList = ({ setAskQuestionDisable }) => {
  const { xSmallScreen } = useContext(MediaQueryContext);
  const [showFullText, setShowFullText] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const { askQuestionEnable, setAskQuestionEnable } = useContext(HelpContext);
  function askQuestion() {
    setAskQuestionEnable(true);
    setAskQuestionDisable(true);
  }

  const toggleShowFullText = (index) => {
    setShowFullText((prevShowFullText) => {
      const updatedShowFullText = [...prevShowFullText];
      updatedShowFullText[index] = !updatedShowFullText[index];
      return updatedShowFullText;
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuestions = dummyQuestions.filter((question) =>
    question.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filterQuestions = (questions) => {
    if (filter === "All") return questions;
    // Implement other filters if needed
    return questions;
  };

  return (
    <>
      <div className="secondary-header">
        <div className="search-fat">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IoMdSearch size={28} />
        </div>
        {/* <div className='ask-question-btn' onClick={askQuestion}>
                Ask a Question
                </div> */}
      </div>
      <div className="qna-container-super">
        <Panel
          className="qna-container-main"
          bordered
          header={
            <Stack justifyContent="space-between">
              <span>Top Questions</span>
              {/* <div>
                                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
                            </div> */}
              <ButtonGroup>
                <Button
                  active={filter === "All"}
                  onClick={() => handleFilterChange("All")}
                >
                  All
                </Button>
                <Button
                  active={filter === "Hot"}
                  onClick={() => handleFilterChange("Hot")}
                >
                  Hot
                </Button>
                {!xSmallScreen && (
                  <>
                    <Button
                      active={filter === "Week"}
                      onClick={() => handleFilterChange("Week")}
                    >
                      Week
                    </Button>
                    <Button
                      active={filter === "Month"}
                      onClick={() => handleFilterChange("Month")}
                    >
                      Month
                    </Button>
                  </>
                )}
                <Dropdown title="More">
                  {xSmallScreen && (
                    <>
                      <Button
                        active={filter === "Week"}
                        onClick={() => handleFilterChange("Week")}
                      >
                        Week
                      </Button>
                      <Button
                        active={filter === "Month"}
                        onClick={() => handleFilterChange("Month")}
                      >
                        Month
                      </Button>
                    </>
                  )}
                  <Button
                    active={filter === "MyQuestion"}
                    onClick={() => handleFilterChange("MyQuestion")}
                  >
                    My Answers
                  </Button>
                </Dropdown>
              </ButtonGroup>
            </Stack>
          }
        >
          <div className="qna-container-sub">
            {filterQuestions(filteredQuestions).map((question, index) => (
              <div key={index} className="question-block">
                <div className="truncate">
                  <h6>
                    {xSmallScreen ? (
                      <>
                        {showFullText[index] || question.text.length <= 20
                          ? question.text
                          : `${question.text.slice(0, 100)}...`}
                        {question.text.length > 100 &&
                          (showFullText[index] ? (
                            <>
                              <Link
                                to="/question-forum"
                                className="tq-read-btn"
                                onClick={() => toggleShowFullText(index)}
                              >
                                {" "}
                                Read Less
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to="/question-forum"
                                className="tq-read-btn"
                                onClick={() => toggleShowFullText(index)}
                              >
                                {" "}
                                Read More
                              </Link>
                            </>
                          ))}
                      </>
                    ) : (
                      <>
                        <Link className="tq-read-btn" to="/question-forum">
                          {question.text}
                        </Link>
                      </>
                    )}
                  </h6>
                </div>
                <AvatarGroup size="xs" spacing={6}>
                  {question.avatars.map((avatar, idx) => (
                    <Avatar
                      key={idx}
                      circle
                      src={avatar}
                      alt={`Avatar ${idx}`}
                    />
                  ))}
                </AvatarGroup>
                <hr></hr>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
};

export default QnaList;
