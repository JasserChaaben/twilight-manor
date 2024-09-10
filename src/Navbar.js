function Navbar() {
    return (
      <nav id="nav-bar">
        <img alt="logo" height="90px" width="90px" src="logo.png" />
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="currentColor"
                d="m1024 165l941 942l-90 90l-83-82v805h-640v-640H896v640H256v-805l-83 82l-90-90zm640 1627V987l-640-640l-640 640v805h384v-640h512v640z"
              />
            </svg>
            <a className="nav-link" href="">
              Dashboard
            </a>
          </li>
  
          <li id="menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4.23"
              >
                <path
                  d="M 55.033333,63.5 12.7,63.499999"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="M 4.2333336,-55.033333 A 8.4666662,8.4666662 0 0 1 12.7,-63.499999"
                  transform="matrix(3.77938 0 0 -3.77938 16.003 .01)"
                />
                <path
                  d="M 4.2333336,55.033333 A 8.4666662,8.4666662 0 0 1 12.7,46.566667"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="m 55.033333,46.566667 -42.333332,-1e-6"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="M 4.2333336,12.7 A 8.4666662,8.4666662 0 0 1 12.7,4.2333336"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="m 55.033333,4.233334 -42.333332,-1e-6"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="m 4.2333334,12.7 2e-7,42.333333"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="M 12.7,46.566666 V 4.230783"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="M 55.033333,4.2333348 V 46.566667"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
                <path
                  d="m 55.033333,46.566667 c -2.662642,5.559118 -2.809222,11.198865 0,16.933333"
                  transform="translate(16.003 .01)scale(3.77938)"
                />
              </g>
            </svg>
            <a className="nav-link" href="">
              Course
            </a>
            {/* start of the dropdown menu */}
            <ul id="dropdown-units">
              <li>
                <a href="#">Unit 1</a>
              </li>
              <li>
                <a href="#">Unit 2</a>
              </li>
              <li>
                <a href="#">Unit 3</a>
              </li>
            </ul>
          </li>
  
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="currentColor"
                d="M1728 1152q26 0 45 19t19 45t-19 45t-45 19t-45-19t-19-45t19-45t45-19m-603-19q-79-54-170-81t-187-28q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-117 35-229t101-207t157-169t203-113q-56-36-100-83t-76-103t-47-118t-17-130q0-106 40-199t109-163T568 40T768 0t199 40t163 109t110 163t40 200q0 67-16 129t-48 119t-75 103t-101 83q81 29 156 80zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149m1280 384q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-65 0-128-23v151h-128v128h-128v128H896v-282l395-396q-11-46-11-90q0-79 30-149t82-122t122-83t150-30m0 640q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 35 9 64t21 61l-414 413v102h128v-128h128v-128h128v-91l93-92q40 23 77 39t86 16"
              />
            </svg>
            <a className="nav-link" href="">
              Sign In
            </a>
          </li>
          <li id="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607"
              />
            </svg>
            <input type="text" placeholder=" search.."></input>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar;