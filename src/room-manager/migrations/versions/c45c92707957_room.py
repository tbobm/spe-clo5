"""room

Revision ID: c45c92707957
Revises: 
Create Date: 2020-07-05 15:42:26.873984

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c45c92707957'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('room_category',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('key', sa.Integer(), nullable=True),
        sa.Column('max_length', sa.Integer(), nullable=False),
        sa.Column('base_price', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('room',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=256), nullable=True),
        sa.Column('room_category_id', sa.Integer(), nullable = False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['room_category_id'], ['room_category.id'])
    )

    op.create_table('establishment_room',
        sa.Column('establishment_id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('room_id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('override_price', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['room_id'], ['room.id'])
    )

def downgrade():
    op.drop_table('establishment_room')
    op.drop_table('room')
    op.drop_table('room_category')
