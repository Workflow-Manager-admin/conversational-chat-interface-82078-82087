#!/bin/bash
cd /home/kavia/workspace/code-generation/conversational-chat-interface-82078-82087/chat_bot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

