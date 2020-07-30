#! /usr/bin/env sh

python -m flask db upgrade
python -m flask run
