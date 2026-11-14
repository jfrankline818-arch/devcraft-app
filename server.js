
const http = require("http");
const url = require("url");

const PORT = process.env.PORT || 3000;
const SITE = "https://devcraft-app-pxrm.onrender.com";
const EMAIL = "aienvironmentarea@gmail.com";
const ADSENSE_ID = "ca-pub-4321543724878495";

const guides = [
  {
    slug: "base64-is-not-encryption",
    title: "Base64 Is Not Encryption: Understanding the Difference",
    description: "Learn what Base64 encoding does, why it is not encryption, and when to use it safely.",
    content: `
      <h2>What is Base64?</h2>
      <p>Base64 is an encoding method that converts binary data into a text representation using a set of 64 characters. It is commonly used when binary data needs to be transmitted through systems designed to handle text.</p>
      <h2>Is Base64 encryption?</h2>
      <p>No. Base64 does not protect information with a secret key or make data confidential. Anyone can decode Base64 data without a password.</p>
      <pre><code>SGVsbG8gV29ybGQ=</code></pre>
      <p>The example above decodes to "Hello World".</p>
      <h2>Encoding versus encryption</h2>
      <ul><li><strong>Encoding:</strong> Changes the representation of data.</li><li><strong>Encryption:</strong> Protects information using cryptographic algorithms and keys.</li></ul>
      <h2>When should you use Base64?</h2>
      <p>Base64 is useful for embedding small binary files in text-based formats, transmitting data through APIs, and representing binary content in JSON or XML.</p>
      <h2>Security advice</h2>
      <p>Never use Base64 alone to protect passwords, API keys, private information, or confidential files. Use appropriate encryption and secure authentication methods.</p>`
  },
  {
    slug: "json-and-xml",
    title: "JSON and XML: Understanding Data Formats",
    description: "A beginner-friendly guide to JSON and XML, their structures, differences, and common uses.",
    content: `
      <h2>What is JSON?</h2>
      <p>JSON stands for JavaScript Object Notation. It is a lightweight data format commonly used to exchange information between applications and servers.</p>
      <pre><code>{
  "name": "John",
  "course": "Computer Science",
  "active": true
}</code></pre>
      <h2>What is XML?</h2>
      <p>XML stands for Extensible Markup Language. It uses custom tags to describe and organize information.</p>
      <pre><code>&lt;student&gt;
  &lt;name&gt;John&lt;/name&gt;
  &lt;course&gt;Computer Science&lt;/course&gt;
  &lt;active&gt;true&lt;/active&gt;
&lt;/student&gt;</code></pre>
      <h2>Key differences</h2>
      <ul><li>JSON generally uses less structural markup.</li><li>XML supports attributes and custom document structures.</li><li>JSON is common in modern web APIs.</li><li>XML remains useful in document processing and some enterprise systems.</li></ul>
      <h2>Which should you choose?</h2>
      <p>Choose the format that fits your application, API requirements, existing systems, and validation needs. Both formats can represent structured data effectively.</p>`
  },
  {
    slug: "web-data-security",
    title: "Web Data Security: Practical Basics for Developers",
    description: "Understand HTTPS, input validation, password storage, and basic web application security.",
    content: `
      <h2>Why web security matters</h2>
      <p>Web applications often handle user accounts, messages, personal information, and other valuable data. Developers should build security into an application from the beginning.</p>
      <h2>Use HTTPS</h2>
      <p>HTTPS protects information travelling between a user's browser and a website. Use a valid TLS certificate and redirect HTTP traffic to HTTPS.</p>
      <h2>Validate user input</h2>
      <p>Never assume that information submitted by a browser is safe. Validate data on the server, enforce reasonable length limits, and use parameterized database queries.</p>
      <h2>Protect passwords</h2>
      <p>Do not store passwords as plain text. Use a password-hashing algorithm designed for passwords, such as Argon2id, bcrypt, or scrypt, with appropriate settings.</p>
      <h2>Protect secrets</h2>
      <p>Keep API keys, database credentials, and private tokens out of public source code. Store secrets in environment variables or a dedicated secrets manager.</p>
      <h2>Keep software updated</h2>
      <p>Update dependencies, remove unused packages, review permissions, and monitor security advisories.</p>`
  },
  {
    slug: "api-response-debugging",
    title: "API Response Debugging for Beginners",
    description: "Learn how to understand HTTP status codes, inspect API responses, and troubleshoot common problems.",
    content: `
      <h2>What is an API response?</h2>
      <p>An API response is the information a server returns after receiving a request. It normally contains a status code, headers, and sometimes a response body.</p>
      <h2>Common HTTP status codes</h2>
      <ul><li><strong>200:</strong> The request succeeded.</li><li><strong>201:</strong> A resource was created.</li><li><strong>400:</strong> The request was invalid.</li><li><strong>401:</strong> Authentication is required or invalid.</li><li><strong>403:</strong> The server refused the request.</li><li><strong>404:</strong> The requested resource was not found.</li><li><strong>429:</strong> Too many requests were received.</li><li><strong>500:</strong> The server encountered an error.</li></ul>
      <h2>How to debug an API</h2>
      <ol><li>Check the endpoint URL and HTTP method.</li><li>Inspect the status code.</li><li>Review request headers and authentication.</li><li>Validate the request body.</li><li>Read the response message.</li><li>Check server logs if you control the backend.</li></ol>
      <h2>Useful debugging tools</h2>
      <p>Browser developer tools, command-line utilities, API clients, and server logs can help identify API problems.</p>`
  },
  {
    slug: "url-encoding-explained",
    title: "URL Encoding Explained",
    description: "Understand percent encoding, reserved characters, and how URLs safely carry information.",
    content: `
      <h2>What is URL encoding?</h2>
      <p>URL encoding, also called percent encoding, represents certain characters using a percent sign followed by two hexadecimal digits.</p>
      <h2>Why is it needed?</h2>
      <p>Some characters have special meanings in URLs. Encoding helps represent data safely when it is included in a URL component.</p>
      <h2>Examples</h2>
      <ul><li>A space can be represented as %20.</li><li>An ampersand can be represented as %26.</li><li>A question mark can be represented as %3F when it is data rather than a query separator.</li></ul>
      <h2>Encoding in JavaScript</h2>
      <pre><code>const value = "hello world";
const encoded = encodeURIComponent(value);
const decoded = decodeURIComponent(encoded);</code></pre>
      <h2>Important distinction</h2>
      <p>Use encodeURIComponent when encoding an individual value, such as a query parameter. Use URL and URLSearchParams when constructing and managing complete URLs.</p>`
  },
  {
    slug: "regex-fundamentals",
    title: "Regular Expressions: A Beginner's Guide",
    description: "Learn regular expression patterns, character classes, quantifiers, and practical examples.",
    content: `
      <h2>What is a regular expression?</h2>
      <p>A regular expression, often called regex, is a pattern used to search, match, and manipulate text.</p>
      <h2>Common symbols</h2>
      <ul><li><code>^</code> matches the beginning of a string.</li><li><code>$</code> matches the end of a string.</li><li><code>\\d</code> matches a digit.</li><li><code>\\w</code> matches a word character.</li><li><code>\\s</code> matches whitespace.</li><li><code>.</code> matches most individual characters.</li><li><code>*</code> means zero or more repetitions.</li><li><code>+</code> means one or more repetitions.</li><li><code>?</code> means zero or one repetition.</li></ul>
      <h2>Example: matching digits</h2>
      <pre><code>const pattern = /^\\d+$/;
console.log(pattern.test("12345")); // true
console.log(pattern.test("12abc")); // false</code></pre>
      <h2>Example: finding words</h2>
      <pre><code>const text = "Learn JavaScript today";
const matches = text.match(/\\w+/g);</code></pre>
      <h2>Test patterns carefully</h2>
      <p>Regex patterns can become complicated. Test them against valid and invalid examples, and remember that regular expressions are not a complete replacement for proper validation.</p>`
  }
];

const tools = [
  {
    slug: "url-encoder",
    title: "URL Encoder and Decoder",
    description: "Encode or decode URL components using standard JavaScript URL encoding functions.",
    fields: `<textarea id="source" placeholder="Enter text or a URL component..."></textarea>
      <div class="actions"><button onclick="convert('encode')">Encode</button><button class="secondary" onclick="convert('decode')">Decode</button></div>`
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter and Validator",
    description: "Format JSON into readable text and check whether the JSON syntax is valid.",
    fields: `<textarea id="source" placeholder='Paste JSON here, for example: {"name":"John"}'></textarea>
      <div class="actions"><button onclick="convert('format')">Format JSON</button><button class="secondary" onclick="convert('minify')">Minify JSON</button>`
  },
  {
    slug: "base64-converter",
    title: "Base64 Encoder and Decoder",
    description: "Convert text to Base64 or decode Base64 into readable text. This tool does not encrypt data.",
    fields: `<textarea id="source" placeholder="Enter text or Base64 data..."></textarea>
      <div class="actions"><button onclick="convert('encode')">Encode</button><button class="secondary" onclick="convert('decode')">Decode</button></div>`
  },
  {
    slug: "regex-tester",
    title: "Regular Expression Tester",
    description: "Test regular expression patterns against sample text and inspect matching results.",
    fields: `<input id="pattern" placeholder="Regular expression, e.g. \\\\d+" />
      <input id="flags" placeholder="Flags, e.g. gi (optional)" />
      <textarea id="source" placeholder="Enter the text to test..."></textarea>
      <div class="actions"><button onclick="convert('test')">Test Pattern</button></div>`
  }
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

function header() {
  return `
  <header class="header">
    <div class="nav wrap">
      <a class="brand" href="/">DevCraft<span> Studio</span></a>
      <nav>
        <a href="/">Home</a>
        <a href="/tools/">Tools</a>
        <a href="/guides/">Guides</a>
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="footer">
    <div class="wrap">
      <p><strong>DevCraft Studio</strong> — practical developer tools and educational resources.</p>
      <div class="footer-links">
        <a href="/about.html">About Us</a>
        <a href="/privacy-policy.html">Privacy Policy</a>
        <a href="/terms.html">Terms of Service</a>
        <a href="/contact.html">Contact Support</a>
      </div>
      <p class="muted">© ${new Date().getFullYear()} DevCraft Studio. All rights reserved.</p>
    </div>
  </footer>`;
}

function styles() {
  return `
  <style>
  :root{--bg:#0b1020;--panel:#121a2d;--text:#edf2ff;--muted:#aab5cb;--accent:#72a5ff;--line:#27334b}
  *{box-sizing:border-box}
  body{margin:0;background:#f5f7fb;color:#202a3a;font-family:Arial,Helvetica,sans-serif;line-height:1.7}
  a{color:#245fc4;text-decoration:none}
  a:hover{text-decoration:underline}
  .wrap{width:min(1100px,92%);margin:auto}
  .header{background:var(--bg);color:white;border-bottom:1px solid #202b43}
  .nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
  .brand{font-size:24px;font-weight:800;color:white}
  .brand span{color:var(--accent)}
  nav{display:flex;gap:20px;flex-wrap:wrap}
  nav a{color:#dce6fb;font-size:14px}
  .hero{background:linear-gradient(135deg,#101a32,#1a3157);color:white;padding:75px 0}
  .hero h1{font-size:clamp(34px,5vw,54px);line-height:1.15;margin:0 0 20px}
  .hero p{max-width:700px;color:#d1def5;font-size:18px}
  .button{display:inline-block;background:#3979e7;color:white;padding:12px 20px;border-radius:8px;font-weight:bold;margin-top:12px}
  main{padding:48px 0;min-height:55vh}
  h1,h2,h3{line-height:1.25}
  h1{font-size:36px}
  h2{margin-top:32px}
  p,li{color:#465269}
  .intro{max-width:780px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;margin-top:25px}
  .card{background:white;padding:24px;border:1px solid #e3e8f1;border-radius:12px;box-shadow:0 4px 18px #1b2a4410}
  .card h3{margin-top:0}
  .card p{font-size:14px}
  .card a{font-weight:bold}
  .toolbox{background:white;padding:26px;border:1px solid #e3e8f1;border-radius:12px;margin-top:25px}
  textarea,input{display:block;width:100%;padding:14px;border:1px solid #cbd4e2;border-radius:8px;font:15px Arial;margin:14px 0;background:white;color:#202a3a}
  textarea{min-height:180px;resize:vertical}
  button{border:0;background:#2869d7;color:white;padding:12px 18px;border-radius:7px;cursor:pointer;font-weight:bold}
  button:hover{opacity:.9}
  button.secondary{background:#596579}
  .actions{display:flex;gap:10px;flex-wrap:wrap}
  .result{margin-top:18px;padding:15px;border-radius:8px;background:#edf3ff;overflow-wrap:anywhere;white-space:pre-wrap}
  .success{color:#167442}.error{color:#b42318}
  pre{background:#101a2d;color:#e8efff;padding:18px;border-radius:8px;overflow:auto}
  code{font-family:Consolas,monospace}
  article{max-width:820px;background:white;padding:35px;border:1px solid #e3e8f1;border-radius:12px}
  article h1{font-size:34px}
  article h2{font-size:23px}
  article p,article li{line-height:1.85}
  .breadcrumb{font-size:14px;color:#748198;margin-bottom:18px}
  .notice{background:#fff8e6;border-left:4px solid #e6a23c;padding:14px;margin:20px 0}
  .footer{background:#0b1020;color:#dce6fb;padding:35px 0;margin-top:45px}
  .footer p{color:#c1cbe0}
  .footer-links{display:flex;gap:18px;flex-wrap:wrap}
  .footer-links a{color:#dce6fb}
  .muted{font-size:13px;color:#aab5cb}
  @media(max-width:650px){.nav{padding:15px 0}nav{gap:12px}.hero{padding:50px 0}article{padding:22px}h1{font-size:30px}}
  </style>`;
}

function clientScript(toolSlug) {
  return `
  <script>
  function convert(action){
    const input=document.getElementById("source");
    const output=document.getElementById("result");
    const status=document.getElementById("status");
    if(!input||!output)return;
    try{
      let result="";
      const value=input.value;
      if("${toolSlug}"==="url-encoder"){
        result=action==="encode"?encodeURIComponent(value):decodeURIComponent(value);
      }else if("${toolSlug}"==="json-formatter"){
        const parsed=JSON.parse(value);
        result=action==="format"?JSON.stringify(parsed,null,2):JSON.stringify(parsed);
      }else if("${toolSlug}"==="base64-converter"){
        if(action==="encode"){
          const bytes=new TextEncoder().encode(value);
          let binary="";
          bytes.forEach(b=>binary+=String.fromCharCode(b));
          result=btoa(binary);
        }else{
          const binary=atob(value.trim());
          const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
          result=new TextDecoder().decode(bytes);
        }
      }else if("${toolSlug}"==="regex-tester"){
        const pattern=document.getElementById("pattern").value;
        const flags=document.getElementById("flags").value;
        const regex=new RegExp(pattern,flags);
        const matches=[...value.matchAll(new RegExp(regex.source,regex.flags.includes("g")?regex.flags:regex.flags+"g"))];
        result=matches.length
          ?matches.map(m=>"Match: "+m[0]+" | Position: "+m.index).join("\\n")
          :"No matches found.";
      }
      output.textContent=result;
      status.textContent="Operation completed successfully.";
      status.className="success";
    }catch(error){
      output.textContent="";
      status.textContent="Error: "+error.message;
      status.className="error";
    }
  }
  function copyResult(){
    const value=document.getElementById("result").textContent;
    navigator.clipboard.writeText(value).then(()=>{
      document.getElementById("status").textContent="Result copied.";
    }).catch(()=>{
      document.getElementById("status").textContent="Copy was unavailable in this browser.";
    });
  }
  </script>`;
}

function page(title, description, body, options = {}) {
  const ads = options.ads ? `
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}" crossorigin="anonymous"></script>` : "";
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${escapeHTML(title)} | DevCraft Studio</title>
    <meta name="description" content="${escapeHTML(description)}">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${SITE}${options.path || "/"}">
    ${ads}
    ${styles()}
  </head>
  <body>${header()}${body}${footer()}</body>
  </html>`;
}

function home() {
  const body = `
  <section class="hero"><div class="wrap">
    <h1>Build, Learn and Create with DevCraft Studio</h1>
    <p>Explore practical browser-based developer tools and clear educational guides covering web development, data formats, programming concepts, and digital security.</p>
    <a class="button" href="/tools/">Explore Developer Tools</a>
    <a class="button" href="/guides/">Read Developer Guides</a>
  </div></section>
  <main class="wrap">
    <section class="intro">
      <h2>Practical tools for everyday development</h2>
      <p>DevCraft Studio provides accessible utilities for common development tasks. The tools run in your browser and are designed to help you inspect, format, encode, and test data.</p>
    </section>
    <div class="grid">
      ${tools.map(t=>`<div class="card"><h3>${t.title}</h3><p>${t.description}</p><a href="/tools/${t.slug}.html">Open tool →</a></div>`).join("")}
    </div>
    <h2>Learn useful development concepts</h2>
    <p>Our guides explain common web development topics with examples and practical advice.</p>
    <div class="grid">
      ${guides.map(g=>`<div class="card"><h3>${g.title}</h3><p>${g.description}</p><a href="/guides/${g.slug}.html">Read guide →</a></div>`).join("")}
    </div>
    <section class="card" style="margin-top:28px">
      <h2>Our approach</h2>
      <p>We aim to make technical concepts easier to understand through useful browser tools, clear explanations, and examples that developers can adapt to their own projects.</p>
      <a href="/about.html">Learn more about DevCraft Studio →</a>
    </section>
  </main>`;
  return page("Developer Tools and Learning Resources","Free browser-based developer tools and educational guides for web development.",body,{path:"/"});
}

function toolsIndex() {
  const body = `<main class="wrap">
    <div class="breadcrumb"><a href="/">Home</a> / Tools</div>
    <h1>Developer Tools</h1>
    <p class="intro">Choose a tool to perform a common development task directly in your browser. Your input is processed locally by the page and is not intentionally sent to our server.</p>
    <div class="grid">${tools.map(t=>`<div class="card"><h3>${t.title}</h3><p>${t.description}</p><a href="/tools/${t.slug}.html">Use this tool →</a></div>`).join("")}</div>
  </main>`;
  return page("Developer Tools","Browse browser-based URL, JSON, Base64 and regex tools.",body,{path:"/tools/"});
}

function toolPage(tool) {
  const body = `<main class="wrap">
    <div class="breadcrumb"><a href="/">Home</a> / <a href="/tools/">Tools</a> / ${tool.title}</div>
    <article>
      <h1>${tool.title}</h1>
      <p>${tool.description}</p>
      <div class="toolbox">
        ${tool.fields}
        </div>
        <h2>Result</h2>
        <div id="status" aria-live="polite"></div>
        <div id="result" class="result" aria-live="polite">Your result will appear here.</div>
        <button class="secondary" onclick="copyResult()">Copy Result</button>
      </div>
      <div class="notice"><strong>Privacy:</strong> This tool processes the information you enter in your browser. Do not use it to handle confidential information on a device or browser you do not trust.</div>
      <h2>How to use this tool</h2>
      <ol><li>Enter your text or data in the input field.</li><li>Select the operation you want to perform.</li><li>Review the result displayed below.</li><li>Use Copy Result if you want to copy the output.</li></ol>
    </article>
  </main>`;
  return page(tool.title,tool.description,body,{path:"/tools/"+tool.slug+".html",ads:false}).replace("</body>",clientScript(tool.slug)+"</body>");
}

function guidesIndex() {
  const body = `<main class="wrap">
    <div class="breadcrumb"><a href="/">Home</a> / Guides</div>
    <h1>Developer Learning Guides</h1>
    <p class="intro">Explore educational articles designed to explain useful concepts in web development, programming, data handling, and digital security.</p>
    <div class="grid">${guides.map(g=>`<div class="card"><h3>${g.title}</h3><p>${g.description}</p><a href="/guides/${g.slug}.html">Read article →</a></div>`).join("")}</div>
  </main>`;
  return page("Developer Guides","Educational articles about programming, web development, APIs, and data security.",body,{path:"/guides/"});
}

function guidePage(guide) {
  const body = `<main class="wrap">
    <div class="breadcrumb"><a href="/">Home</a> / <a href="/guides/">Guides</a> / ${escapeHTML(guide.title)}</div>
    <article>
      <h1>${escapeHTML(guide.title)}</h1>
      <p><strong>${escapeHTML(guide.description)}</strong></p>
      ${guide.content}
      <hr>
      <p><strong>Explore related tools:</strong> Visit our <a href="/tools/">developer tools</a> to work with URLs, JSON, Base64 data, and regular expressions.</p>
      <p><em>Educational content is provided for general learning. Always test code and security practices in an appropriate environment before using them in production.</em></p>
    </article>
  </main>`;
  return page(guide.title,guide.description,body,{path:"/guides/"+guide.slug+".html",ads:true});
}

function informationPage(title,description,content,path) {
  return page(title,description,`<main class="wrap"><article><div class="breadcrumb"><a href="/">Home</a> / ${title}</div><h1>${title}</h1>${content}</article></main>`,{path});
}

function aboutPage() {
  return informationPage("About Us","Learn about DevCraft Studio and its developer resources.",`
    <p>Welcome to DevCraft Studio, an online resource focused on practical developer utilities and educational content.</p>
    <h2>What we provide</h2>
    <p>Our website brings together browser-based tools and learning guides that help users understand and perform common development tasks.</p>
    <ul><li>URL encoding and decoding.</li><li>JSON formatting and validation.</li><li>Base64 encoding and decoding.</li><li>Regular expression testing.</li><li>Educational guides about programming and web technologies.</li></ul>
    <h2>Our goal</h2>
    <p>Our goal is to make useful development information easier to access and understand. We aim to improve our tools and educational resources over time.</p>
    <h2>Contact</h2>
    <p>For questions, corrections, or suggestions, contact us at <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
  `,"/about.html");
}

function privacyPage() {
  return informationPage("Privacy Policy","Read the DevCraft Studio privacy policy.",`
    <p><strong>Last updated:</strong> November 14, 2026</p>
    <p>This Privacy Policy explains how DevCraft Studio handles information when you visit our website.</p>
    <h2>Information you provide</h2>
    <p>If you contact us by email, we may receive your email address and the information you choose to include in your message. We use this information to respond to your request.</p>
    <h2>Browser-based tools</h2>
    <p>Our developer tools are designed to process input in your browser. We do not intentionally transmit the text you enter into these tools to our server. However, your browser, device, extensions, or other services may process information independently.</p>
    <h2>Cookies and advertising</h2>
    <p>We may use third-party services, including Google AdSense, to display advertisements. These services may use cookies or similar technologies to provide, measure, and personalize advertising, subject to their own policies and applicable settings.</p>
    <p>Google's advertising information is available at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Google's advertising policies and technologies information</a>.</p>
    <h2>Analytics and server logs</h2>
    <p>Our hosting provider may process technical information such as IP addresses, browser details, request times, and server logs for security, reliability, and troubleshooting.</p>
    <h2>Third-party websites</h2>
    <p>Our website may link to external websites. We are not responsible for the privacy practices or content of third-party websites.</p>
    <h2>Data security</h2>
    <p>We take reasonable steps to maintain the website, but no internet transmission or storage system can be guaranteed to be completely secure.</p>
    <h2>Children's privacy</h2>
    <p>Our website is intended for a general audience and is not designed to knowingly collect personal information from children.</p>
    <h2>Changes to this policy</h2>
    <p>We may update this policy when our services or legal requirements change. Updates will be published on this page.</p>
    <h2>Contact us</h2>
    <p>Questions about this policy can be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
  `,"/privacy-policy.html");
}

function termsPage() {
  return informationPage("Terms of Service","Read the terms governing use of DevCraft Studio.",`
    <p><strong>Last updated:</strong> November 14, 2026</p>
    <p>By accessing DevCraft Studio, you agree to these Terms of Service. If you do not agree, please discontinue use of the website.</p>
    <h2>Use of the website</h2>
    <p>You may use the website for lawful personal, educational, and professional purposes. You must not use it to violate laws, interfere with the website, or harm other users.</p>
    <h2>Developer tools</h2>
    <p>Our tools are provided for convenience and general development assistance. You are responsible for reviewing their output and checking that it is appropriate for your intended use.</p>
    <h2>Educational information</h2>
    <p>Guides and examples are provided for general educational purposes. They are not a guarantee that a particular technique is suitable for every project.</p>
    <h2>Availability</h2>
    <p>We may modify, suspend, or discontinue parts of the website at any time. We do not guarantee uninterrupted availability or error-free operation.</p>
    <h2>Intellectual property</h2>
    <p>Unless otherwise stated, the website's original text, design, and branding belong to DevCraft Studio. You may not reproduce substantial portions of our original content for commercial redistribution without permission.</p>
    <h2>External links</h2>
    <p>Links to third-party websites are provided for convenience. We do not control or endorse all third-party content.</p>
    <h2>Disclaimer</h2>
    <p>The website and its tools are provided on an "as is" and "as available" basis, to the extent permitted by applicable law. We make no guarantee that outputs will be accurate, complete, or suitable for a particular purpose.</p>
    <h2>Limitation of liability</h2>
    <p>To the extent permitted by applicable law, DevCraft Studio is not liable for indirect or consequential loss arising from the use of the website or reliance on its tools and content.</p>
    <h2>Changes</h2>
    <p>We may revise these terms by publishing an updated version on this page.</p>
    <h2>Contact</h2>
    <p>Questions about these terms can be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
  `,"/terms.html");
}

function contactPage() {
  return informationPage("Contact Support","Contact the DevCraft Studio support team.",`
    <p>We welcome questions, feedback, corrections, and suggestions about our developer tools and educational guides.</p>
    <h2>Email support</h2>
    <p>Send your message to:</p>
    <p><strong><a href="mailto:${EMAIL}">${EMAIL}</a></strong></p>
    <h2>When contacting us</h2>
    <p>Please include the name of the tool or page you are asking about, a clear description of the issue, and any relevant error message. Do not send passwords, API keys, or other confidential information.</p>
    <p>We will review messages and respond when possible.</p>
  `,"/contact.html");
}

function send(res,status,body,type="text/html; charset=utf-8") {
  res.writeHead(status,{"Content-Type":type,"X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin"});
  res.end(body);
}

const server = http.createServer((req,res) => {
  const parsed = url.parse(req.url,true);
  const path = decodeURIComponent(parsed.pathname || "/");

  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res,405,"Method Not Allowed","text/plain; charset=utf-8");
  }

  if (path === "/robots.txt") {
    return send(res,200,`User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`,"text/plain; charset=utf-8");
  }

  if (path === "/ads.txt") {
    return send(res,200,`google.com, ${ADSENSE_ID.replace("ca-pub-","pub-")}, DIRECT, f08c47fec0942fa0\n`,"text/plain; charset=utf-8");
  }

  if (path === "/sitemap.xml") {
    const pages = ["/","/tools/","/guides/","/about.html","/privacy-policy.html","/terms.html","/contact.html",
      ...tools.map(t=>"/tools/"+t.slug+".html"),
      ...guides.map(g=>"/guides/"+g.slug+".html")];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`<url><loc>${SITE}${p}</loc></url>`).join("\n")}\n</urlset>`;
    return send(res,200,xml,"application/xml; charset=utf-8");
  }

  let output = null;

  if (path === "/") output = home();
  else if (path === "/tools" || path === "/tools/") output = toolsIndex();
  else if (path === "/guides" || path === "/guides/") output = guidesIndex();
  else if (path === "/about.html") output = aboutPage();
  else if (path === "/privacy-policy.html") output = privacyPage();
  else if (path === "/terms.html") output = termsPage();
  else if (path === "/contact.html") output = contactPage();
  else {
    const tool = tools.find(t=>path === "/tools/"+t.slug+".html");
    const guide = guides.find(g=>path === "/guides/"+g.slug+".html");
    if (tool) output = toolPage(tool);
    else if (guide) output = guidePage(guide);
  }

  if (!output) {
    return send(res,404,page("Page Not Found","The requested page could not be found.",`
      <main class="wrap"><article><h1>404 — Page Not Found</h1>
      <p>The page you are looking for does not exist or may have moved.</p>
      <a class="button" href="/">Return to homepage</a></article></main>`,{path}),"text/html; charset=utf-8");
  }

  if (req.method === "HEAD") {
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
    return res.end();
  }

  send(res,200,output);
});

server.listen(PORT,"0.0.0.0",() => {
  console.log("DevCraft Studio is running on port "+PORT);
});
