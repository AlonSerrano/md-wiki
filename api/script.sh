#!/bin/bash
nohup ./md-wiki &
nginx -g "daemon off;"
