$(function() {
  var INDEX = 0;

  async function sendMessageToOpenAI(message) {
    try {
      const OPENAI_API_KEY = 'sk-proj-SdCokRAfFStM1CkiwjBmT3BlbkFJpYa2050Zfq4ljJ2gUUx4'; // Securely store your API key

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message }
          ],
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content.trim();
      generate_message(botMessage, 'bot');
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
    }
  }

  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val();
    if (msg.trim() == '') {
      return false;
    }
    generate_message(msg, 'self');
    sendMessageToOpenAI(msg);
  });

  function generate_message(msg, type,) {
    INDEX++;
    var avatar = (type === 'self') ? "boy.png" : "chatbot.png"; // Choose avatar based on the sender
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"images/" + avatar + "\">"; // Update avatar image source
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self') {
      $("#chat-input").val('');
    }
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
  }
  
  function generate_button_message(msg, buttons) {
    INDEX++;
    var btn_obj = buttons.map(function(button) {
      return "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\"" + button.value + "\">" + button.name + "<\/a><\/li>";
    }).join('');
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg user\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"images/chatbot.png\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "          <div class=\"cm-msg-button\">";
    str += "            <ul>";
    str += btn_obj;
    str += "            <\/ul>";
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX).hide().fadeIn(300);
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    $("#chat-input").attr("disabled", true);
  }

  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  });

  function endSession() {
    $(".chat-logs").empty();
    $("#chat-input").val('');
    $("#chat-input").attr("disabled", true);
    INDEX = 0;
  }

  $("#chat-circle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });

  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
    endSession(); 
  });

  $("#close-session").click(function() {
    endSession();
  });

  $("#chat-circle").click(function() {
    startNewSession();
  });

  function startNewSession() {
    $("#chat-input").attr("disabled", false);
  }
});
